/*
Correct way to import it:
import * as Act from "act.types.ts";

Chat events types to communicate with server
Create or join a new chat, send or take messages or destroy that chat at all
 */

/**
 * Request acts' types aggregation
 */
export type Requests = Create | Join | Send | Take | Destroy;

/**
 * Responses acts' types aggregation
 */
export type Responses =
  | CreateResp
  | JoinResp
  | SendResp
  | TakeResp
  | DestroyResp;

/**
 * Message act like create, take, join, etc.
 * Main actions with server which says what the server should do
 */
export enum Type {
  Create = "create",
  Join = "join",
  Send = "send",
  Take = "take",
  Destroy = "destroy"
}

/**
 * Create a new one chat message and take their data for invitation
 * and connecting
 */
export type Create = {
  act: Type.Create;
};

/**
 * Response for Create with invitation and connecting data
 */
export type CreateResp = {
  chatid: string;
  joinid: string;
  userid: string;
};

/**
 * Joint to existing chat by joinid which can be taken from another user
 * or from Create
 */
export type Join = {
  act: Type.Join;
  joinid: string;
};

/**
 * Response for Join with chatid and userid.
 * This fields are requiring for communication in any chat
 */
export type JoinResp = {
  chatid: string;
  userid: string;
};

/**
 * Send a message to concrete chat by their chatid and userid
 */
export type Send = {
  act: Type.Send;
  chatid: string;
  userid: string;
  text: string;
};

/**
 * Response for Send. This api doesn't matter with temporary unusable field,
 * but you can use messageid for inner purposes
 */
export type SendResp = {
  messageid: string;
};

/**
 * Take a new last message from concrete chat. After that, this message will
 * be removed from the server
 */
export type Take = {
  act: Type.Take;
  chatid: string;
  userid: string;
};

/**
 * Response for Take with message's text or data
 */
export type TakeResp = {
  messageid: string;
  text: string;
};

/**
 * Destroy the chat. Use it when you don't want to continue communication.
 * All undelivered messages on the server will be removed.
 */
export type Destroy = {
  act: Type.Destroy;
  chatid: string;
  userid: string;
};

/**
 * Response for Destroy with destroyed chatid. Actually, it's not so
 * important api so you can skip this type in your API implementation
 */
export type DestroyResp = {
  chatid: string;
};

/**
 * Special type for server errors.
 * Message of this type can be returned as a response for any request
 */
export type ErrorResp = {
  error: number;
  desc: string;
  reason: string;
};
