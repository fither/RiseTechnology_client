import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import JobList from '../views/JobList.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Job List',
    component: JobList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
