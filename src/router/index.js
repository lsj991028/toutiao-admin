import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Home from '../views/home/index.vue'
import Layout from '../views/layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'layout', // 有默认子路由,父路由不用写name
    component: Layout,
    children: [
      {
        path: '', // 值为空是默认子路由,就不用起名字了
        name: 'home',
        component: Home
      }
    ]
  }
]

// 路由配置表
const router = new VueRouter({
  routes
})

export default router
