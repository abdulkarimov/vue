import { createRouter, createWebHistory } from 'vue-router'
import Storage from '../views/Storage.vue'
import StorageAdd from '../views/StorageAdd.vue'
import ProductDelete from '../views/ProductDelete.vue'

const routes = [
  {
    path: '/',
    name: 'storage',
    component: Storage
  },
  {
    path: '/store/:id',
    name: 'StorageAdd',
    component: StorageAdd
  },
    {
    path: '/ProductDelete/:id',
    name: 'ProductDelete',
    component: ProductDelete
  },
  {
    path: '/store/',
    name: 'storageAdd',
    component: StorageAdd
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
