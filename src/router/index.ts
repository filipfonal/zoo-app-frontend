import Vue from 'vue';
import VueRouter from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import Home from '@/views/Home.vue';
import Auth from '@/views/Auth.vue';
import Zoo from '@/views/Zoo.vue';
import User from '@/views/User.vue';

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
        path: '/zoo/:id',
        name: 'zoo',
        component: Zoo,
      },
      {
        path: 'auth',
        name: 'auth',
        component: Auth,
      },
      {
        path: '/user/:id',
        name: 'user',
        component: User,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'auth' && !localStorage.getItem('auth_token')) {
    next('auth');
  } else {
    next();
  }
});

export default router;
