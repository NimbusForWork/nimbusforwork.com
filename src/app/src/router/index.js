import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NotFoundComponent from '@/components/NotFoundComponent'
import CrewAppSettings from '@/pages/CrewAppSettings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/app/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/app/crew/settings/:userId',
      name: 'CrewAppSettings',
      component: CrewAppSettings,
      props: { default: true }
    },
    { path: '*', component: NotFoundComponent }
  ]
})
