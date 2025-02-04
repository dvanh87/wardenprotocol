//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params.js";
import { Keychain, KeychainAmino, KeychainSDKType } from "./keychain.js";
import { Space, SpaceAmino, SpaceSDKType } from "./space.js";
import { Key, KeyAmino, KeySDKType, KeyRequest, KeyRequestAmino, KeyRequestSDKType } from "./key.js";
import { SignRequest, SignRequestAmino, SignRequestSDKType, SignTransactionRequest, SignTransactionRequestAmino, SignTransactionRequestSDKType } from "./signature.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
/** GenesisState defines the warden module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters of the module. */
  params: Params;
  keychains: Keychain[];
  spaces: Space[];
  keys: Key[];
  keyRequests: KeyRequest[];
  signatureRequests: SignRequest[];
  signTransactionRequests: SignTransactionRequest[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/warden.warden.v1beta2.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the warden module's genesis state. */
export interface GenesisStateAmino {
  /** params defines all the parameters of the module. */
  params: ParamsAmino;
  keychains: KeychainAmino[];
  spaces: SpaceAmino[];
  keys: KeyAmino[];
  key_requests: KeyRequestAmino[];
  signature_requests: SignRequestAmino[];
  sign_transaction_requests: SignTransactionRequestAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/warden.warden.v1beta2.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the warden module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  keychains: KeychainSDKType[];
  spaces: SpaceSDKType[];
  keys: KeySDKType[];
  key_requests: KeyRequestSDKType[];
  signature_requests: SignRequestSDKType[];
  sign_transaction_requests: SignTransactionRequestSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    keychains: [],
    spaces: [],
    keys: [],
    keyRequests: [],
    signatureRequests: [],
    signTransactionRequests: []
  };
}
export const GenesisState = {
  typeUrl: "/warden.warden.v1beta2.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.keychains) {
      Keychain.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.spaces) {
      Space.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.keys) {
      Key.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.keyRequests) {
      KeyRequest.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.signatureRequests) {
      SignRequest.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.signTransactionRequests) {
      SignTransactionRequest.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.keychains.push(Keychain.decode(reader, reader.uint32()));
          break;
        case 3:
          message.spaces.push(Space.decode(reader, reader.uint32()));
          break;
        case 4:
          message.keys.push(Key.decode(reader, reader.uint32()));
          break;
        case 5:
          message.keyRequests.push(KeyRequest.decode(reader, reader.uint32()));
          break;
        case 6:
          message.signatureRequests.push(SignRequest.decode(reader, reader.uint32()));
          break;
        case 7:
          message.signTransactionRequests.push(SignTransactionRequest.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      keychains: Array.isArray(object?.keychains) ? object.keychains.map((e: any) => Keychain.fromJSON(e)) : [],
      spaces: Array.isArray(object?.spaces) ? object.spaces.map((e: any) => Space.fromJSON(e)) : [],
      keys: Array.isArray(object?.keys) ? object.keys.map((e: any) => Key.fromJSON(e)) : [],
      keyRequests: Array.isArray(object?.keyRequests) ? object.keyRequests.map((e: any) => KeyRequest.fromJSON(e)) : [],
      signatureRequests: Array.isArray(object?.signatureRequests) ? object.signatureRequests.map((e: any) => SignRequest.fromJSON(e)) : [],
      signTransactionRequests: Array.isArray(object?.signTransactionRequests) ? object.signTransactionRequests.map((e: any) => SignTransactionRequest.fromJSON(e)) : []
    };
  },
  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.keychains) {
      obj.keychains = message.keychains.map(e => e ? Keychain.toJSON(e) : undefined);
    } else {
      obj.keychains = [];
    }
    if (message.spaces) {
      obj.spaces = message.spaces.map(e => e ? Space.toJSON(e) : undefined);
    } else {
      obj.spaces = [];
    }
    if (message.keys) {
      obj.keys = message.keys.map(e => e ? Key.toJSON(e) : undefined);
    } else {
      obj.keys = [];
    }
    if (message.keyRequests) {
      obj.keyRequests = message.keyRequests.map(e => e ? KeyRequest.toJSON(e) : undefined);
    } else {
      obj.keyRequests = [];
    }
    if (message.signatureRequests) {
      obj.signatureRequests = message.signatureRequests.map(e => e ? SignRequest.toJSON(e) : undefined);
    } else {
      obj.signatureRequests = [];
    }
    if (message.signTransactionRequests) {
      obj.signTransactionRequests = message.signTransactionRequests.map(e => e ? SignTransactionRequest.toJSON(e) : undefined);
    } else {
      obj.signTransactionRequests = [];
    }
    return obj;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.keychains = object.keychains?.map(e => Keychain.fromPartial(e)) || [];
    message.spaces = object.spaces?.map(e => Space.fromPartial(e)) || [];
    message.keys = object.keys?.map(e => Key.fromPartial(e)) || [];
    message.keyRequests = object.keyRequests?.map(e => KeyRequest.fromPartial(e)) || [];
    message.signatureRequests = object.signatureRequests?.map(e => SignRequest.fromPartial(e)) || [];
    message.signTransactionRequests = object.signTransactionRequests?.map(e => SignTransactionRequest.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.keychains = object.keychains?.map(e => Keychain.fromAmino(e)) || [];
    message.spaces = object.spaces?.map(e => Space.fromAmino(e)) || [];
    message.keys = object.keys?.map(e => Key.fromAmino(e)) || [];
    message.keyRequests = object.key_requests?.map(e => KeyRequest.fromAmino(e)) || [];
    message.signatureRequests = object.signature_requests?.map(e => SignRequest.fromAmino(e)) || [];
    message.signTransactionRequests = object.sign_transaction_requests?.map(e => SignTransactionRequest.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
    if (message.keychains) {
      obj.keychains = message.keychains.map(e => e ? Keychain.toAmino(e) : undefined);
    } else {
      obj.keychains = message.keychains;
    }
    if (message.spaces) {
      obj.spaces = message.spaces.map(e => e ? Space.toAmino(e) : undefined);
    } else {
      obj.spaces = message.spaces;
    }
    if (message.keys) {
      obj.keys = message.keys.map(e => e ? Key.toAmino(e) : undefined);
    } else {
      obj.keys = message.keys;
    }
    if (message.keyRequests) {
      obj.key_requests = message.keyRequests.map(e => e ? KeyRequest.toAmino(e) : undefined);
    } else {
      obj.key_requests = message.keyRequests;
    }
    if (message.signatureRequests) {
      obj.signature_requests = message.signatureRequests.map(e => e ? SignRequest.toAmino(e) : undefined);
    } else {
      obj.signature_requests = message.signatureRequests;
    }
    if (message.signTransactionRequests) {
      obj.sign_transaction_requests = message.signTransactionRequests.map(e => e ? SignTransactionRequest.toAmino(e) : undefined);
    } else {
      obj.sign_transaction_requests = message.signTransactionRequests;
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta2.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};