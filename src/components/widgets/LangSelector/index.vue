<!--
Shows lang with label and allows to chose another one.
Requires i18n Vue plugin.
Behavior same as a v-button
-->

<template>
  <v-menu offset-y>
    <template #activator="{ on: menu }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            v-on="{ ...menu, ...tooltip }"
            text
            :icon="compact"
            :fab="compact"
            :small="compact"
          >
            <CountryFlag
              :country="langs[langID].flag"
              :class="{ 'mr-3': !compact }"
            />
            <template v-if="!compact">
              <div style="width: 30px">
                {{ langs[langID].short }}
              </div>
              <v-icon right>mdi-menu-down</v-icon>
            </template>
          </v-btn>
        </template>
        <span>
          <v-icon left dark>mdi-translate</v-icon>
          {{ $t("changeLang") }}
        </span>
      </v-tooltip>
    </template>

    <v-list>
      <v-list-item
        v-for="(lang, i) in langs"
        :disabled="i === langID"
        :key="i"
        link
        @click="setLangID(i)"
      >
        <v-list-item-title class="d-flex align-center">
          <CountryFlag :country="lang.flag" class="mr-3" />
          {{ lang.name }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CountryFlag from "@/components/atoms/CountryFlag/CountryFlag.vue";

/**
 * List item for a lang
 */
type Lang = {
  abbr: string;
  flag: string;
  name: string;
  short: string;
};

@Component({
  components: {
    CountryFlag
  }
})
export default class LangSelector extends Vue {
  /**
   * Compact view with only flag
   */
  @Prop({ type: Boolean })
  compact!: boolean;

  // List of available languages
  private readonly langs: Lang[] = [
    { abbr: "en", flag: "uk", name: "English", short: "ENG" },
    { abbr: "ru", flag: "ru", name: "Русский", short: "РУС" }
  ];

  // Current lang ID
  private get langID() {
    for (let i = 0; i < this.langs.length; i++) {
      if (this.langs[i].abbr === this.$root.$i18n.locale) return i;
    }
    return 0;
  }

  private setLangID(id: number) {
    this.$root.$i18n.locale = this.langs[id].abbr;
  }
}
</script>

<i18n>
{
  "en": {
    "changeLang": "Change app lang"
  },
  "ru": {
    "changeLang": "Сменить язык"
  }
}
</i18n>
