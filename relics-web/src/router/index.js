import { createRouter, createWebHistory } from 'vue-router';

import LRPage from '../views/LoginPage';
import MainPage from '../views/MainPage';
import RDPage from "@/views/RelicsDetailPage";
import RegisterPage from "@/views/RegisterPage";
import DataViewPage from '@/views/DataViewPage';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/LRPage',
    name: 'LRPage',
    component: LRPage
  },
  {
    path: '/RDPage',
    name: 'RDPage',
    component: RDPage
  },
  {
    path: '/RegisterPage',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/DataViewPage',
    name: 'DataViewPage',
    component: DataViewPage
  },
  {
    path: '/ClassificationPage',
    name: 'ClfPage',
    component: () => import('../views/ClassificationPage')
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
