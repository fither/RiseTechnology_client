import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import JobList from '../views/JobList.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Job List',
    component: JobList
  },
  {
    path: '/job-add',
    name: 'Job Add',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/jobAdd.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
