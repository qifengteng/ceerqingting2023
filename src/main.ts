import { createApp } from "vue";
import App from "./App.vue";
// reset style sheet
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// font css
import "@/assets/fonts/font.scss";
// element css
import "element-plus/dist/index.css";
// element dark css
import "element-plus/theme-chalk/dark/css-vars.css";
// custom element dark css
import "@/styles/element-dark.scss";
// custom element css
import "@/styles/element.scss";
// svg icons
import "virtual:svg-icons-register";
// element plus
import ElementPlus from "element-plus";
// vue Router
import router from "@/routers";
// pinia store
import pinia from "@/stores";
// vue i18n
import I18n from "@/languages/index";
// element icons
import * as Icons from "@element-plus/icons-vue";
// custom directive
import directives from "@/directives/index";

const app = createApp(App);

// register the element Icons component
Object.keys(Icons).forEach(key => app.component(key, Icons[key as keyof typeof Icons]));

app.use(ElementPlus).use(pinia).use(I18n).use(router).use(directives).mount("#app");
