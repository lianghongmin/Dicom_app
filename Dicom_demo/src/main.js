// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.axios = axios

import AlloyFinger from 'alloyfinger/alloy_finger' // 手势库
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue'
Vue.use(AlloyFingerVue, {
  AlloyFinger
})

import VueLazyLoad from 'vue-lazyload'
//懒加载的默认图片 
import def_lazy_img from './../static/image/spinner.gif'
Vue.use(VueLazyLoad,{
   // error:'./../static/error.png',
    loading:def_lazy_img
})

Vue.config.productionTip = false;

Vue.prototype.api='http://192.168.21.85:28082'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
