// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import less from 'less'
import router from './router'
import store from './store'
import XEUtils from 'xe-utils'
// import VXEUtils from 'vxe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

Vue.use(ElementUI)
Vue.use(less)
Vue.use(Vuex)
Vue.use(VXETable)

Vue.config.productionTip = false

window.XEUtils = XEUtils
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App },
  template: '<App/>'
}).$mount('#app')
