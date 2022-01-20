import { createRouter, createWebHistory } from 'vue-router'
import Storage from '../views/Storage.vue'
import StorageAdd from '../views/StorageAdd.vue'
//import StorageEdit from '../views/StorageEdit.vue'

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
