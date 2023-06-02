import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/skills',
      name: 'skills',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SkillsView.vue')
    },
    {
      path: '/character',
      name: 'character',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CharacterView.vue')
    },
    {
      path: '/character-selection',
      name: 'character-selection',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CharacterSelectionView.vue')
    },
    {
      path: '/campaign',
      name: 'campaign',
      component: () => import('../views/CampaignView.vue')
    }
  ]
})

export default router
