import "@mdi/font/css/materialdesignicons.min.css";
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: colors.lightBlue.darken2,
        secondary: colors.lightBlue.lighten4,
        accent: colors.blue.darken1
      },
      dark: {
        primary: colors.lightBlue.darken4,
        secondary: colors.lightBlue.darken3,
        accent: colors.blue.lighten2
      }
    }
  }
});
