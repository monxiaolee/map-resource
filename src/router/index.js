import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import d3Map01 from '@/view/d3Map01'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/d3Map01',
      name: 'd3Map01',
      component: d3Map01
    }
  ]
})
