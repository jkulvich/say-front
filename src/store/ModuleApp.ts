import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
  name: "ModuleApp",
  namespaced: true,
  stateFactory: true
})
export default class ModuleApp extends VuexModule {
  /**
   * Side Bar open state
   */
  showSidebar = false;

  /**
   * Set sidebar open state
   * @param open Sidebar open state
   */
  @Mutation
  public setShowSidebar(open: boolean) {
    this.showSidebar = open;
  }
}
