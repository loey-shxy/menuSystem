import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: async () => await import('@/views/login/login.vue')
    },
    {
      path: '/',
      name: 'index',
      component: async () => await import('@/views/layout/layout.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: async () => await import('@/views/home/home.vue')
        }
      ]
    },
  ]
})

router.afterEach((to, from) => {
  if (to.path === '/redirect') {
      if (from && from.path !== '/redirect') {
          router.replace({
              path: from.path,
              query: from.query
          })
      }
  }
})

export default router