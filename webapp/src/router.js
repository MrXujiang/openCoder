import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/Index.vue'),
      children : [
        {
          path: 'allArticle',
          name: 'allArticle',
          component: () => import('@/components/content/Article.vue')
        },
        {
          path: 'webDev',
          name: 'webDev',
          component: () => import('@/components/content/WebDev.vue')
        },
        {
          path: 'mobile',
          name: 'mobile',
          component: () => import('@/components/content/Mobile.vue')
        },
        {
          path: 'h5Game',
          name: 'h5Game',
          component: () => import('@/components/content/H5Game.vue')
        },
        {
          path: 'optimize',
          name: 'optimize',
          component: () => import('@/components/content/Optimize.vue')
        },
        {
          path: 'nodeJs',
          name: 'nodeJs',
          component: () => import('@/components/content/NodeJs.vue')
        },
        {
          path: 'haveFun',
          name: 'haveFun',
          component: () => import('@/components/content/HaveFun.vue')
        },
        {
          path: '',
          redirect: 'allArticle'
        }
      ]
    },
    // 路由重定向
    {
      path:'',
      redirect: '/allArticle'
    }
  ]
})
