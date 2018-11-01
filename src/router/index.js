import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import d3Map01 from '@/view/d3Map01'
import particle from '@/view/particle/index'
import loadModel from '@/view/loadModel/index'

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
    },
    {
      path: '/particle',
      name: 'particle',
      component: particle
    },
    {
      path: '/loadModel',
      name: 'loadModel',
      component: loadModel
    }
  ]
})
