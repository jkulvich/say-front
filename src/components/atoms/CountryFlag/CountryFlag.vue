<!--
Component to show specified country flag as an image
-->

<template>
  <component
    v-if="flagComponent"
    :is="flagComponent"
    :style="{
      width: size,
      height: size
    }"
  />
  <div
    v-else
    :style="{
      width: size,
      height: size,
      display: 'inline'
    }"
  >
    <v-icon>mdi-close-circle</v-icon>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component({
  components: {
    FlagRussia: () => import("./Flags/Russia.vue"),
    FlagUnitedKingdom: () => import("./Flags/UnitedKingdom.vue")
  }
})
export default class CountryFlag extends Vue {
  /**
   * List of aliases for countries name
   */
  private readonly aliases = [
    { aliases: ["uk", "united-kingdom"], country: "UnitedKingdom" },
    { aliases: ["ru", "rus", "russia"], country: "Russia" }
  ];

  /**
   * Icon size in px for width and height as the flags is round
   */
  @Prop({ type: Number, default: 20 })
  readonly size!: number;
  /**
   * Required flag name, e.g. england, russia or aliases like eng or rus
   */
  @Prop({ type: String, required: true })
  readonly country!: string;

  /**
   * Watches for country changes and loads new image
   */
  @Watch("country", { immediate: true })
  onCountryChanged(country: string) {
    // Searching in aliases for full name
    this.flagComponent = "";
    this.aliases.forEach(bag =>
      bag.aliases.forEach(alias => {
        if (alias === country.toLowerCase())
          this.flagComponent = `Flag${bag.country}`;
      })
    );
  }

  /**
   * Current flag's component
   */
  private flagComponent = "";
}
</script>

<style scoped></style>
