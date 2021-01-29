<!--
Checks ping to any site and renders
-->

<template>
  <v-menu offset-y z-index="100" :close-on-content-click="false">
    <template #activator="{ on: menu }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn v-on="{ ...menu, ...tooltip }" fab icon small>
            <v-icon>{{ profile.icon }}</v-icon>
          </v-btn>
        </template>
        <span>
          <v-icon left dark>mdi-swap-vertical</v-icon>
          {{ $t(profile.hint) }}
          <span v-show="ping !== Number.MAX_VALUE && ping !== Number.MIN_VALUE">
            [ping: {{ ping }}]
          </span>
        </span>
      </v-tooltip>
    </template>
    <v-card width="400">
      <v-card-text class="text-left">
        <b>{{ $t("card.title") }}</b>
        <br />
        {{ $t("card.text") }}
        <v-divider class="my-2" />
        <WidgetServiceChecker />
        {{ $t(profile.hint) }}
        <span v-show="ping !== Number.MAX_VALUE && ping !== Number.MIN_VALUE">
          [ping: {{ ping }}]
        </span>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import Axios from "axios";
import WidgetServiceChecker from "@/components/widgets/ServiceChecker/index.vue";

/**
 * Connection profile.
 * Connection ping should be less or equal this ping for match
 */
type ConnectionProfile = {
  icon: string;
  hint: string;
  ping: number;
};

@Component({
  components: {
    WidgetServiceChecker
  }
})
export default class ConnectionQualityIndicator extends Vue {
  // URL to ping
  @Prop({ type: String, default: "/" })
  url!: string;

  // Interval between pings
  @Prop({ type: Number, default: 5000 })
  interval!: number;

  @Watch("interval", { immediate: true })
  watchInterval(interval: number) {
    this.testPing(this.url);
    this.pinger = +setInterval(() => this.testPing(this.url), interval);
  }

  // Pinger context
  pinger = 0;

  // Requests' helper
  axios = Axios.create();

  // Current ping
  ping = Number.MIN_VALUE;

  // Connection ping should be less or equal this ping for match
  profiles: ConnectionProfile[] = [
    {
      icon: "mdi-wifi-strength-alert-outline",
      hint: "connection.unknown",
      ping: Number.MIN_VALUE
    },
    {
      icon: "mdi-wifi-strength-4",
      hint: "connection.perfect",
      ping: 100
    },
    {
      icon: "mdi-wifi-strength-3",
      hint: "connection.good",
      ping: 250
    },
    {
      icon: "mdi-wifi-strength-2",
      hint: "connection.normal",
      ping: 400
    },
    {
      icon: "mdi-wifi-strength-1",
      hint: "connection.bad",
      ping: 700
    },
    {
      icon: "mdi-wifi-strength-outline",
      hint: "connection.awful",
      ping: this.interval
    },
    {
      icon: "mdi-wifi-strength-off-outline",
      hint: "connection.disconnected",
      ping: Number.MAX_VALUE
    }
  ];

  // Returns current profile for current ping
  get profile() {
    for (let i = 0; i < this.profiles.length; i++) {
      if (this.profiles[i].ping >= this.ping) return this.profiles[i];
    }
    return this.profiles[this.profiles.length - 1];
  }

  /**
   * Test ping
   * @param url URL to ping
   */
  async testPing(url: string) {
    try {
      const timeStart = +new Date();
      await this.axios.head(url, {
        timeout: this.interval
      });
      const timeEnd = +new Date();
      this.ping = timeEnd - timeStart;
    } catch {
      this.ping = Number.MAX_VALUE;
    }
  }

  // Stops the pinger cycle
  destroyed() {
    clearInterval(this.pinger);
  }
}
</script>

<style scoped></style>

<i18n>
{
  "en": {
    "connection": {
      "unknown": "Unknown connection",
      "perfect": "Perfect connection",
      "good": "Good connection",
      "normal": "Normal connection",
      "bad": "Bad connection",
      "awful": "Awful connection",
      "disconnected": "No connection"
    },
    "card": {
      "title": "Connection Quality",
      "text": "Higher quality - higher service. With high quality you send & receive messages more quickly. We determine quality based on ping"
    }
  },
  "ru": {
    "connection": {
      "unknown": "Соединение не определено",
      "perfect": "Отличное соединение",
      "good": "Хорошее соединение",
      "normal": "Нормальное соединение",
      "bad": "Плохое соединение",
      "awful": "Ужасное соединение",
      "disconnected": "Соединение отсутствует"
    },
    "card": {
      "title": "Качество связи",
      "text": "Чем выше качество - тем быстрее Вы получаете и отправляете сообщения. Мы определяем качество на основе задержки ответа между клиентом и сервером (ping)"
    }
  }
}
</i18n>
