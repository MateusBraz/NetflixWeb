import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import App from '../App'
import Login from '../components/Login'
import Cadastro from '../components/Cadastro'
import Categoria from '../components/Categoria'

export default new Router({
  routes: [
    {path: '/filmes', component: App},
    {path: '/', component: Login},
    {path: '/cadastro', component: Cadastro },
    {path: '/categoria', component: Categoria}
  ]
})
