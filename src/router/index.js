import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/storage/users';

const routes = [
  {
    path: '/',
    name: 'TODO_LIST',
    component: () => import('@/views/TodoView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'LOGIN',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false },
  },
  { path: '/:pathMatch(.*)*', redirect: '/login' },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.isUserAuth) {
    return { name: 'LOGIN' };
  }
});

export default router;
