import { createRouter, createWebHistory } from 'vue-router';

const Auth = require("@/controllers/Auth.js");

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  Auth.refresh();
  next();
});

export default router;