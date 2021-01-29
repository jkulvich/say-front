import "@mdi/font/css/materialdesignicons.min.css";
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "md"
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: colors.lightBlue.darken2
      },
      dark: {
        primary: colors.lightBlue.darken4
      }
    }
  }
});
