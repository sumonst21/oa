import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
	path: '/',
	name: 'home',
	component: () => import('../pages/Arb.vue')
  },
  {
	path: '/arb',
	name: 'arb',
	component: () => import('../pages/Arb.vue')
  },
  {
	path: '/free-bet',
	name: 'free-bet',
	component: () => import('../pages/FreeBet.vue')
  },
  {
	path: '/risk-free',
	name: 'risk-free',
	component: () => import('../pages/RiskFree.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
