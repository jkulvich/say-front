<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" @click="switchTheme" fab icon small>
        <v-icon>
          mdi-circle-half-full
        </v-icon>
      </v-btn>
    </template>
    <span>
      <v-icon dark left>
        <template v-if="$vuetify.theme.dark">mdi-weather-sunny</template>
        <template v-else>mdi-weather-night</template>
      </v-icon>
      {{ $vuetify.theme.dark ? $t("hints.toLight") : $t("hints.toDark") }}
    </span>
  </v-tooltip>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class ThemeSwitcher extends Vue {
  /**
   * Switch current theme. Dark to light, light to dark
   */
  switchTheme() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  }
}
</script>

<style scoped></style>

<i18n>
{
  "en": {
    "hints": {
      "toDark": "Switch to dark mode",
      "toLight": "Switch to light mode"
    }
  },
  "ru": {
    "hints": {
      "toDark": "Включить тёмный режим",
      "toLight": "Включить светлый режим"
    }
  }
}
</i18n>
