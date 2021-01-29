/*
Chat types
 */

import { Canceler } from "axios";

/**
 * Chat API responses type
 */
export type ChatResp<T> = {
  cancel?: Canceler;
  resp: Promise<T>;
};
