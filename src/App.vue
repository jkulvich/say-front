<template>
  <v-app>
    <!-- App's Controls -->
    <AppBar />
    <SideBar />

    <!-- App Content -->
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// Components
import SideBar from "@/components/parts/SideBar/SideBar.vue";
import AppBar from "@/components/parts/AppBar/AppBar.vue";

// Store
import { getModule } from "vuex-module-decorators";
import ModuleApp from "@/store/ModuleApp";
import ModuleContainers from "@/store/modules/ModuleContainers";

import DataLocker, {
  DataLockerIncorrectKeyError
} from "@/libs/safestorage/datalocker";

@Component({
  components: {
    AppBar,
    SideBar
  }
})
export default class App extends Vue {
  modContainers = getModule(ModuleContainers, this.$store);

  mounted() {
    const container = DataLocker.encrypt(new Uint8Array([1, 2, 3]), "test");
    try {
      const data = DataLocker.decrypt(container, "test");
      console.log(data);
    } catch (e) {
      if (e instanceof DataLockerIncorrectKeyError)
        console.log("incorrect key");
      else throw e;
    }
    // this.modContainers.test();
  }
}
</script>

<style lang="scss"></style>
