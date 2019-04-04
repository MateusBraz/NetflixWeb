import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import App from '../App'

export default new Router({
  routes: [
    {path: '/filmes', component: App},

  ]
})
