<template>
  <v-app id="app">
    <div id="nav">
      <v-btn>{{ $t("message") }}</v-btn>
      <!--      <CountryFlag country="uk"/>-->
      <LangSelector/>
    </div>
    <router-view/>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
// import CountryFlag from "@/components/atoms/CountryFlag/CountryFlag.vue"
import LangSelector from "@/components/molecules/LangSelector/LangSelector.vue";

@Component({
  components: {
    // CountryFlag,
    LangSelector,
  },
})
export default class App extends Vue {
}
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
