<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-toolbar-title class="mr-2">SAY</v-toolbar-title>
      <WidgetConnectionQualityIndicator url="https://say.over.red" />
      <v-spacer />
      <WidgetThemeSwitcher />
      <WidgetLangSelector :compact="$vuetify.breakpoint.smAndDown" />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WidgetLangSelector from "@/components/widgets/LangSelector/index.vue";
import WidgetConnectionQualityIndicator from "@/components/widgets/ConnectionQualityIndicator/index.vue";
import WidgetThemeSwitcher from "@/components/widgets/ThemeSwitcher/index.vue";

@Component({
  components: {
    WidgetLangSelector,
    WidgetConnectionQualityIndicator,
    WidgetThemeSwitcher
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
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
