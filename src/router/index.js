import Vue from 'vue'
import VueRouter from 'vue-router'
import TaskList from '../components/TaskList.vue'
import LoginAuth from '../components/LoginAuth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: TaskList
  },
  {
    path: '/LoginAuth',
    name: 'LoginAuth',
    component: LoginAuth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
