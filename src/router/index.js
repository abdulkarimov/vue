import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Storage from '../views/Storage.vue'
import StorageAdd from '../views/StorageAdd.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/storageAdd/:id',
    name: 'storageAdd',
    component: StorageAdd

  },
  {
    path: '/storage',
    name: 'storage',
    component: Storage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
