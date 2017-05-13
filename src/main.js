// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './my-theme/index.less'
import axios from './http'
// import axios from 'axios'
import VueAxios from 'vue-axios'
import vuex from 'vuex'
import store from './vuex/store'

// import VueKindEditor from 'vue-kindeditor'
// import 'kindeditor/kindeditor-all-min.js'
// import 'kindeditor/themes/default/default.css'

import VueQuillEditor from 'vue-quill-editor'

// 用 axios 进行 Ajax 请求
Vue.use(VueAxios, axios);

Vue.use(iView);


Vue.config.productionTip = false;

// Vue.use(VueKindEditor);
Vue.use(VueQuillEditor);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  template: '<App/>',
  components: { App }
})
