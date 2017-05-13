import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

import Login from '@/pages/login/login'
import Hello from '@/pages/Hello'
import Index from '@/pages/index'
import Welcome from '@/pages/welcome/welcome'
import clientClassify from '@/pages/client/clientClassify'
import clientRank from '@/pages/client/clientRank'
import area from '@/pages/client/area'
import trade from '@/pages/client/trade'
import goodsList from '@/pages/goods/goodsList'
import addGoods from '@/pages/goods/addGoods'
import UE from '@/components/UE'


Vue.use(Router)

const routes = [
    {
      path: '/',
      name :'index',
      meta: {
          requireAuth: true,
      },
      component: Index,
      children : [
        {
          path: '/',
          name : '/',
          component : Welcome
        },
        {
          path : '/hello' ,
          component : Hello
        },
        {
          path : '/clientClassify',
          name : 'clientClassify',
          component : clientClassify
        },
        {
          path : '/clinetRank',
          name : 'clientRank',
          component : clientRank
        },
        {
          path : '/area',
          name : area,
          component : area
        },
        {
          path : '/trade',
          name : 'trade',
          component : trade
        },
        {
          path : '/goodsList',
          name : 'goodsList',
          component : goodsList,
         },
          {
            path : '/goodsList/add',
            name : 'addGoods',
            component : addGoods
          }
          
        
      ]
    },
    {
      path : '/:id/login',
      name : 'login',
      component : Login
    },

    {
      path: '/aa',
      name: 'aa',
      component: Hello
    },
    {
      path : '/editor',
      name : 'editor',
      component : UE
    }
]

// 页面刷新，重新给 token 赋值
if (window.localStorage.getItem('token')) {
    store.commit('login', window.localStorage.getItem('token'));
    store.commit('saveUser', JSON.parse(window.localStorage.getItem('user')));
    store.commit('saveCorp', JSON.parse(window.localStorage.getItem('corp')));
}

var router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    // 
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: 'aa',
                // query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})

export default router;