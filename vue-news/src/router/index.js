import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Theme from '@/components/theme'
import HotTheme from '@/components/HotTheme'
import Login from '@/components/Login'

import News from '@/components/theme/News'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'home',
      // component: {
      //   default: Home,
      //   hottheme: HotTheme
      // },
      component: Home,
      redirect: { name: 'hottheme' },
      children: [
        { path: 'theme/:id', name: 'theme', component: Theme },
        { path: 'hottheme/:id', name: 'hottheme', component: HotTheme }
      ]
    },
    // },
    // {
    //   path: '/theme/:id',
    //   name: 'theme',
    //   component: Theme,
    //   children: [
    //     { path: 'news/:id', name: 'news', component: News }
    //   ]
    // }
    {
      path: '/news/:id', name: 'news', component: News
    },
    {
      path: '/login', name: 'login', component: Login
    }
  ]
})
