/*
Store and load encrypted and unencrypted containers into IndexedDB
It uses localForage: https://localforage.github.io/localForage/
 */

import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { Module as Mod } from "vuex";
import localforage from "localforage";

@Module({
  name: "modules/ModuleContainers",
  namespaced: true,
  stateFactory: true
})
export default class ModuleContainers extends VuexModule {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  constructor(module: Mod<any, any>) {
    super(module);
    console.log("localforage mounted");
  }

  @Action
  test() {
    console.log("HEYA!");
  }
}
