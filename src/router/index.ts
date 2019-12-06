import Vue from 'vue';
import VueRouter from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import Home from '@/views/Home.vue';
import Auth from "@/views/Auth.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: 'auth',
        name: 'auth',
        component: Auth,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
