<template>
  <v-navigation-drawer
    :value="storeApp.showSidebar"
    @input="val => storeApp.setShowSidebar(val)"
    fixed
    temporary
    floating
    width="400"
    app
  >
    <!-- Main Header -->
    <v-list class="text-left" color="primary" dark>
      <v-list-item @click="storeApp.setShowSidebar(false)">
        <!-- Close SideBar -->
        <v-list-item-action>
          <v-icon>mdi-arrow-left</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="title">
            SAY Chat
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t("subtitle") }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- Account Switch -->
      <v-list-group :value="false" color="white">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Profiles' Management</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-divider class="mt-2" />
        <v-list-item dense>
          <v-list-item-content>
            <v-btn text>
              <v-icon left>mdi-plus</v-icon>
              Create
            </v-btn>
          </v-list-item-content>
          <v-list-item-content>
            <v-btn text>
              <v-icon left>mdi-upload</v-icon>
              Export
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mb-2" />
        <v-list-item dense link @click="() => {}">
          <v-list-item-content>
            <v-list-item-title>Yuri Kulagin</v-list-item-title>
            <v-list-item-subtitle>Current Profile</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn icon @click.stop="() => {}">
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </v-list-item>
        <v-list-item dense link @click="() => {}">
          <v-list-item-content>
            <v-list-item-title>Yumemi Hoshino</v-list-item-title>
            <v-list-item-subtitle>
              Last Signed-In: Feb 25, 16:43
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-btn icon @click.stop="() => {}">
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </v-list-item>
      </v-list-group>
    </v-list>

    <!-- Features Menu -->
    <v-list class="text-left" color="secondary">
      <!-- Account Settings -->
      <v-list-group
        :value="false"
        prepend-icon="mdi-account"
        color="background"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Yuri Kulagin</v-list-item-title>
            <v-list-item-subtitle>
              Public info & Security
            </v-list-item-subtitle>
          </v-list-item-content>
        </template>
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              label="Public User Name"
              hint="Other people will see it instead of random"
              dense
              persistent-hint
              clearable
              counter="20"
              :maxlength="20"
              color="background"
            />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-textarea
              label="Public Bio & Status"
              hint="Several words about you or something"
              dense
              persistent-hint
              no-resize
              rows="1"
              auto-grow
              counter="70"
              :maxlength="70"
              clearable
              color="background"
            />
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-dialpad</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Set PIN Code</v-list-item-title>
            <v-list-item-subtitle>
              Additional way to unlock your profile
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-key</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Change Pass</v-list-item-title>
            <v-list-item-subtitle>
              Change profile pass
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-delete</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Destroy Profile</v-list-item-title>
            <v-list-item-subtitle>
              Destroy this profile, chats & all data
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>

    <!-- Menu List -->
    <v-list class="text-left">
      <!-- Feedback -->
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-message-alert</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Feedback</v-list-item-title>
          <v-list-item-subtitle>
            Bugs, Reports & Suggestions
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- Support Me -->
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-handshake</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Support Me</v-list-item-title>
          <v-list-item-subtitle>
            Share, Fork or Donate
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- About -->
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-information</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            About
          </v-list-item-title>
          <v-list-item-subtitle>
            Motivation & Tech info
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import ModuleApp from "@/store/ModuleApp";

@Component({})
export default class SideBar extends Vue {
  storeApp = getModule(ModuleApp, this.$store);
}
</script>

<style scoped></style>

<i18n>
{
  "en": {
    "subtitle": "Your Safe Messaging Provider",
    "suggestions": {
      "recentDialogSubtitle": "Last chat you have opened"
    }
  },
  "ru": {
    "subtitle": "Ваш личный канал связи",
    "suggestions": {
      "recentDialogSubtitle": "Предыдущий диалог"
    }
  }
}
</i18n>
