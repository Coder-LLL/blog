// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store"; //导入store
// 引入vue-cookie
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

// 实现代码高亮功能
//导入代码高亮文件
import hljs from "highlight.js";
//导入代码高亮样式
import "highlight.js/styles/monokai-sublime.css";
//自定义一个代码高亮指令
Vue.directive("highlight", function (el) {
  let highlight = el.querySelectorAll("pre code");
  highlight.forEach((block) => {
    hljs.highlightBlock(block);
  });
});

import "./assets/styles/base.scss";
// import "./assets/styles/global.scss";
import "./assets/styles/icon.css";
// 导入svg
import "./icons";

// 导入图片懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  loading: require("./assets/images/loading.gif"),
  error: require("./assets/images/loading.gif"),
  attempt: 1,
  try: 3,
});
// 按需导入elementUI
// import ElementUI from "./plugins/element";
import "element-ui/lib/theme-chalk/index.css";
// Vue.use(ElementUI);

import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

//引入
import moment from "moment";
//挂载到原型
Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

import { setupStore } from "./store";

// 如果登陆过，会把信息保存在vuex和cookie中，但是一刷新页面vuex会丢失，在这里重新获取一下，与此同时可以实现自动登录
setupStore();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
