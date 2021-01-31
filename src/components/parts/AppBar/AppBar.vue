<template>
  <v-app-bar color="primary" dark app>
    <v-app-bar-nav-icon
      @click.stop="storeApp.setShowSidebar(!storeApp.showSidebar)"
    ></v-app-bar-nav-icon>
    <v-toolbar-title class="mr-2">SAY</v-toolbar-title>
    <WidgetConnectionQualityIndicator url="https://say.over.red" />
    <v-spacer />
    <WidgetThemeSwitcher />
    <WidgetLangSelector :compact="$vuetify.breakpoint.smAndDown" />
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// Widgets
import WidgetLangSelector from "@/components/widgets/LangSelector/LangSelector.vue";
import WidgetConnectionQualityIndicator from "@/components/widgets/ConnectionQualityIndicator/ConnectionQualityIndicator.vue";
import WidgetThemeSwitcher from "@/components/widgets/ThemeSwitcher/ThemeSwitcher.vue";

// Store
import { getModule } from "vuex-module-decorators";
import ModuleApp from "@/store/ModuleApp";

@Component({
  components: {
    WidgetLangSelector,
    WidgetConnectionQualityIndicator,
    WidgetThemeSwitcher
  }
})
export default class App extends Vue {
  storeApp = getModule(ModuleApp, this.$store);
}
</script>

<style lang="scss"></style>
