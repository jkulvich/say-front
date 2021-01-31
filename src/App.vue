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

@Component({
  components: {
    AppBar,
    SideBar
  }
})
export default class App extends Vue {
  storeApp = getModule(ModuleApp, this.$store);
}
</script>

<style lang="scss">
html {
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
