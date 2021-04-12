
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/utama/Index.vue'), name: 'utama' },
      { path: 'ringkasan', component: () => import('pages/ringkasan/Index.vue'), name: 'ringkasan' }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
