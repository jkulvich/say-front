<!--
Shows lang with label and allows to chose another one
-->

<template>
  <v-menu offset-y>
    <template #activator="{ attrs, on }">
      <v-btn
          text
          v-bind="attrs"
          v-on="on"
      >
        <CountryFlag :country="langs[langID].flag" class="mr-3"/>
        {{ langs[langID].short }}
        <v-icon right>mdi-menu-down</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item-group v-model="langID">
        <v-list-item
            v-for="(lang, i) in langs"
            :disabled="i === langID"
            :key="i"
            link
        >
          <v-list-item-title class="d-flex align-center">
            <CountryFlag :country="lang.flag" class="mr-3"/>
            {{ lang.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import {Component, Prop, Watch, Vue} from "vue-property-decorator"
import CountryFlag from "@/components/atoms/CountryFlag/CountryFlag.vue"

@Component({
  components: {
    CountryFlag,
  },
})
export default class LangSelector extends Vue {
  private readonly langs = [
    {flag: "uk", name: "English", short: "ENG"},
    {flag: "ru", name: "Русский", short: "РУС"},
  ]

  private langID = 0
}
</script>

<style scoped>
</style>
