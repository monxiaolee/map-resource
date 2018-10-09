import Vue from 'vue'
import App from './App'
import router from './router'

// import * as d3 from 'd3'

import '~/css/index.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
