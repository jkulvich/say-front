import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
  name: "ModuleChat",
  namespaced: true,
  stateFactory: true
})
export default class ModuleChat extends VuexModule {}
