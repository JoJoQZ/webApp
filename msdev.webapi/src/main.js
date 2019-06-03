// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })


import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import ajax from '@/services/ajax'

// axios 统一配置
ajax.init()

// 全局变量
indow.localStorage.gatewayDomain = 'https://dev-api.cn/'
window.localStorage.defaultLanguage = 'ZH_CN'