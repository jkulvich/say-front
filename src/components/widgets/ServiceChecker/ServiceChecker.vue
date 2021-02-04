<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" @click="check" fab icon small>
        <v-icon>
          <template v-if="status === 'unknown'">
            mdi-swap-vertical-circle-outline
          </template>
          <template v-else-if="status === 'checking'">
            {{ checkStages[checkStage].icon }}
          </template>
          <template v-else-if="status === 'success'">
            mdi-check-circle-outline
          </template>
          <template v-else-if="status === 'error'">
            mdi-alert-circle-outline
          </template>
        </v-icon>
      </v-btn>
    </template>
    <span>
      <v-icon left dark>
        <template v-if="status === 'unknown'">
          mdi-progress-question
        </template>
        <template v-else-if="status === 'checking'">
          mdi-progress-clock
        </template>
        <template v-else-if="status === 'success'">
          mdi-progress-check
        </template>
        <template v-else-if="status === 'error'">
          mdi-progress-alert
        </template>
      </v-icon>
      <template v-if="status === 'unknown'">
        {{ $t("hints.pressToCheck") }}
      </template>
      <template v-else-if="status === 'checking'">
        {{ $t("hints.checking", [this.checkStep]) }}
      </template>
      <template v-else-if="status === 'success'">
        {{ $t("hints.checkedSuccess") }}
      </template>
      <template v-else-if="status === 'error'">
        {{ $t("hints.checkedError") }}
      </template>
    </span>
  </v-tooltip>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Chat from "@/libs/api/chat";
import Axios from "axios";

/**
 * Stages of service checking
 */
type CheckStage = {
  icon: string;
  hint: string;
};

/**
 * Checking status
 */
enum CheckStatus {
  Unknown = "unknown",
  Checking = "checking",
  Success = "success",
  Error = "error"
}

@Component({})
export default class ServiceChecker extends Vue {
  // List of check stages
  private checkStages: CheckStage[] = [
    { hint: "", icon: "mdi-circle-slice-1" },
    { hint: "", icon: "mdi-circle-slice-2" },
    { hint: "", icon: "mdi-circle-slice-3" },
    { hint: "", icon: "mdi-circle-slice-4" },
    { hint: "", icon: "mdi-circle-slice-5" },
    { hint: "", icon: "mdi-circle-slice-6" },
    { hint: "", icon: "mdi-circle-slice-7" },
    { hint: "", icon: "mdi-circle-slice-8" }
  ];

  // Check status
  private status = CheckStatus.Unknown;

  // Check step
  private checkStep = "";

  // Check stage if widget is in Checking status
  private checkStage = 0;

  // Start service checking
  private async check() {
    if (this.status === CheckStatus.Checking) return;
    this.status = CheckStatus.Checking;
    this.checkStage = 0;
    try {
      await new Chat(
        Axios.create({
          baseURL: "https://say.over.red/api",
          timeout: 5000
        })
      ).selfTest((prc, action) => {
        this.checkStage = Math.floor((this.checkStages.length - 1) * prc);
        this.checkStep = action;
      });
      this.status = CheckStatus.Success;
    } catch (e) {
      this.status = CheckStatus.Error;
    }
    this.checkStage = 0;
  }
}
</script>

<style scoped></style>

<i18n>
{
  "en": {
    "hints": {
      "pressToCheck": "Press to check the service",
      "checking": "Checking: {0}",
      "checkedSuccess": "Service check succeed, press to repeat",
      "checkedError": "Service check failed, press to repeat"
    }
  },
  "ru": {
    "hints": {
      "pressToCheck": "Нажмите для проверки сервиса",
      "checking": "Проверка: {0}",
      "checkedSuccess": "Сервис функционирует, нажмите для повтора",
      "checkedError": "Проблемы с сервисом, нажмите для повтора"
    }
  }
}
</i18n>
