/**
 * Chat API implementation
 */
import Axios, { AxiosInstance, AxiosResponse, CancelTokenSource } from "axios";
import Act from "./act";
import { ChatResp } from "@/libs/api/chat/chat.types";

export default class Chat {
  axios!: AxiosInstance;

  /**
   * Create a new Chat API to communicate with server
   * @param axios Axios instance with configured baseURL
   */
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  /**
   * Wrap response data to specific format with cancellation and possible error
   * @param msgResp Axios response Promise
   * @param cancelToken Token for cancel
   */
  private wrapResp<TResp>(
    msgResp: Promise<AxiosResponse<TResp>>,
    cancelToken?: CancelTokenSource
  ): ChatResp<TResp> {
    return {
      cancel: cancelToken?.cancel,
      resp: new Promise<TResp>((resolve, reject) => {
        msgResp
          .then(resp => {
            if ("error" in resp.data) {
              reject(resp.data);
            } else {
              resolve(resp.data);
            }
          })
          .catch(err =>
            reject({
              error: -1,
              desc: "Client error",
              reason:
                err.response ??
                (err.isAxiosError ? err.message : err.toString())
            } as Act.ErrorResp)
          );
      })
    };
  }

  /**
   * Send a command to the server and take result
   * @param msg Server's command
   */
  private sendCmd<TReq, TResp>(msg: TReq) {
    const cancelToken = Axios.CancelToken.source();
    const msgResp = this.axios.post("/", JSON.stringify(msg), {
      cancelToken: cancelToken.token
    });

    return this.wrapResp<TResp>(msgResp, cancelToken);
  }

  /**
   * Chat API self test.
   * Makes full cycle of all APIs.
   * @param callback Callback with percent of operation to done and action
   */
  async selfTest(callback?: (prc: number, action: string) => void) {
    const msg = "SELF_TEST";
    let created: Act.CreateResp;
    let joined: Act.JoinResp;

    // Test operations
    const ops = [
      {
        act: "launch",
        op: () => {
          return;
        }
      },
      {
        act: "create",
        op: async () => (created = await this.create().resp)
      },
      {
        act: "join",
        op: async () => (joined = await this.join(created.joinid).resp)
      },
      {
        act: "send1",
        op: async () => await this.send(created.chatid, created.userid, msg)
      },
      {
        act: "take1",
        op: async () => {
          const resp = await this.take(joined.chatid, joined.userid).resp;
          if (resp.text !== msg) throw new Error("Incorrect msg");
        }
      },
      {
        act: "send2",
        op: async () => await this.send(joined.chatid, joined.userid, msg)
      },
      {
        act: "take2",
        op: async () => {
          const resp = await this.take(created.chatid, created.userid).resp;
          if (resp.text !== msg) throw new Error("Incorrect msg");
        }
      },
      {
        act: "destroy",
        op: async () => await this.destroy(joined.chatid, joined.userid).resp
      }
    ];

    for (let i = 0; i < ops.length; i++) {
      if (callback) callback(i / ops.length, ops[i].act);
      await ops[i].op();
    }
    if (callback) callback(1, "finish");
  }

  /**
   * Create a new one chat and get auth data
   */
  create() {
    const cmd: Act.Create = {
      act: Act.Type.Create
    };
    return this.sendCmd<typeof cmd, Act.CreateResp>(cmd);
  }

  /**
   * Join to existing chat
   * @param joinid Special token to one-time connect
   */
  join(joinid: string) {
    const cmd: Act.Join = {
      act: Act.Type.Join,
      joinid
    };
    return this.sendCmd<typeof cmd, Act.JoinResp>(cmd);
  }

  /**
   * Send a message into specific chat
   * @param chatid Specific chat ID
   * @param userid Specific user ID for specific chat
   * @param text Message
   */
  send(chatid: string, userid: string, text: string) {
    const cmd: Act.Send = {
      act: Act.Type.Send,
      chatid,
      userid,
      text
    };
    return this.sendCmd<typeof cmd, Act.SendResp>(cmd);
  }

  /**
   * Take last message from the server for specific chat
   * @param chatid Specific chat ID
   * @param userid Specific user ID for specific chat
   */
  take(chatid: string, userid: string) {
    const cmd: Act.Take = {
      act: Act.Type.Take,
      chatid,
      userid
    };
    return this.sendCmd<typeof cmd, Act.TakeResp>(cmd);
  }

  /**
   * Destroy specific chat
   * @param chatid Specific chat ID
   * @param userid Specific user ID for specific chat
   */
  destroy(chatid: string, userid: string) {
    const cmd: Act.Destroy = {
      act: Act.Type.Destroy,
      chatid,
      userid
    };
    return this.sendCmd<typeof cmd, Act.DestroyResp>(cmd);
  }
}
