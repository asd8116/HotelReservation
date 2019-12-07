import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: () => import('@/views/Rooms.vue')
  },
  {
    path: '/room/:roomId',
    name: 'room',
    component: () => import('@/views/Room.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('@/views/404.vue')
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

export default router
