import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CrewAppSettings from '@/pages/CrewAppSettings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/crew/settings/:userId',
      name: 'CrewAppSettings',
      component: CrewAppSettings,
      props: { default: true }
    }
  ]
})
