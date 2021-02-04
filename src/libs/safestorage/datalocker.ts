import { sha512 } from "js-sha512";

/**
 * DataLocker Common Error
 */
export class DataLockerError extends Error {
  name = "DataLocker";

  constructor(message: string) {
    super(message);
  }
}

/**
 * DataLocker Incorrect Key Error
 */
export class DataLockerIncorrectKeyError extends DataLockerError {}

/**
 * Provides methods to encrypt and decrypt data by hash protected xor.
 *
 * Formal: sha512(data) + sha512({2 bytes: size of trash bytes} + data-block[2:]) [+ sha512(data-block)...]
 *
 * Bytes at the end of decrypted data is "trash bytes" with random values to
 * prevent "Enigma attack"
 */
export default class DataLocker {
  /**
   * Xor operator for Uint8Arrays
   * @param a - First data bytes
   * @param b - Second data bytes
   */
  private static xor(a: Uint8Array, b: Uint8Array) {
    if (a.length !== b.length)
      throw new DataLockerError("Arrays' length must equal");
    return new Uint8Array(a).map((val, i) => val ^ b[i]);
  }

  /**
   * Expands data size by repeating
   * @param data - Original data
   * @param size - Expanded data size
   */
  private static expand(data: Uint8Array, size: number) {
    if (size < data.length)
      throw new DataLockerError("size can't be lower than original data size");
    const expandedData = new Uint8Array(size);
    for (let i = 0; i < size; i++) expandedData[i] = data[i % data.length];
    return expandedData;
  }

  /**
   * Compares 2 data blocks
   * @param a - First data
   * @param b - Second data
   * @private
   */
  private static match(a: Uint8Array, b: Uint8Array) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }

  /**
   * Aligns data for 512 bits blocks.
   * Stores extra bytes' count as 2 bytes at start of first block.
   * @param data - Original data to align
   * @private
   */
  private static align512(data: Uint8Array) {
    const blockSize = 512 / 8;
    const extraCountBlockSize = 2;
    // Size of trash bytes at the end of original data
    const dataExtraCount =
      blockSize - ((data.length + extraCountBlockSize) % blockSize);
    // Size of block with "trash bytes" count at end of original data
    const dataExtraCountBlock = new Uint8Array(
      // Uint16 - it's 2 bytes and must be equal extraCountBlockSize to correct
      // calculating
      new Uint16Array([dataExtraCount]).buffer
    );
    // Prepared space for aligned data
    const alignedData = new Uint8Array(
      extraCountBlockSize + dataExtraCount + data.length
    );
    // Setting first 2 bytes as dataExtraCountBlock
    alignedData[0] = dataExtraCountBlock[0];
    alignedData[1] = dataExtraCountBlock[1];
    // Setting other bytes as data value
    for (let i = 0; i < data.length; i++)
      alignedData[extraCountBlockSize + i] = data[i];
    // Setting extra "trash bytes" to prevent "Enigma attack"
    for (let i = 0; i < dataExtraCount; i++)
      alignedData[extraCountBlockSize + data.length + i] =
        (Math.random() * 256) | 0;
    return alignedData;
  }

  /**
   * De-Aligns data which aligned with align512 function
   * @param data - Aligned data to dealign
   * @private
   */
  private static dealign512(data: Uint8Array) {
    const blockSize = 512 / 8;
    const extraCountBlockSize = 2;
    if (data.length === 0) throw new DataLockerError("data can't be empty");
    if (data.length % blockSize !== 0)
      throw new DataLockerError("data isn't aligned");
    // Extra bytes' count at end of aligned data
    const extraCount = new Uint16Array(
      new Uint8Array(data.slice(0, extraCountBlockSize)).buffer
    )[0];
    // Checking for correct align
    if (extraCount > data.length - 2)
      throw new DataLockerError(
        "incorrect align, extra count can't be greater than data size"
      );
    return data.slice(2, data.length - extraCount);
  }

  /**
   * Encrypts data and returns encrypted container data
   * @param data - Original data to encrypt
   * @param key - String which will be used as a password
   */
  static encrypt(data: Uint8Array, key: string) {
    const dataHash = new Uint8Array(sha512.arrayBuffer(data));
    const keyHash = new Uint8Array(sha512.arrayBuffer(key));
    const alignedData = DataLocker.align512(data);
    // Making key hash's length equal to aligned data length
    const alignedKeyHash = DataLocker.expand(keyHash, alignedData.length);
    const encryptedData = DataLocker.xor(alignedData, alignedKeyHash);
    // Making resulting array with hash and encrypted data
    const encryptedContainer = new Uint8Array(
      dataHash.length + encryptedData.length
    );
    // Setting original data's hash bytes
    for (let i = 0; i < dataHash.length; i++)
      encryptedContainer[i] = dataHash[i];
    // Setting encrypted data's bytes
    for (let i = 0; i < encryptedData.length; i++)
      encryptedContainer[dataHash.length + i] = encryptedData[i];
    return encryptedContainer;
  }

  /**
   * Decrypts data from encrypted container
   * @param encryptedContainer - Encrypted data
   * @param key - String which will be used as a password
   */
  static decrypt(encryptedContainer: Uint8Array, key: string) {
    const blockSize = 512 / 8;
    if (encryptedContainer.length < blockSize * 2)
      throw new DataLockerError(
        "incorrect encrypted container, size can't be lower 128"
      );
    const dataHash = encryptedContainer.slice(0, blockSize);
    const encryptedData = encryptedContainer.slice(blockSize);
    const keyHash = new Uint8Array(sha512.arrayBuffer(key));
    // Making key hash's length equal to aligned data length
    const alignedKeyHash = DataLocker.expand(
      keyHash,
      encryptedContainer.length - blockSize
    );
    // Decrypt aligned data
    const alignedData = DataLocker.xor(encryptedData, alignedKeyHash);
    let data: Uint8Array;
    try {
      data = DataLocker.dealign512(alignedData);
    } catch (e) {
      throw new DataLockerIncorrectKeyError(
        `incorrect key or encrypted container is corrupted: ${e.toString()}`
      );
    }
    // Calculating data hash and matching it
    if (!DataLocker.match(dataHash, new Uint8Array(sha512.arrayBuffer(data))))
      throw new DataLockerIncorrectKeyError(
        "incorrect key or encrypted container is corrupted"
      );
    return data;
  }
}
