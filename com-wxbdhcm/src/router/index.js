import Vue from 'vue'
import VueRouter from 'vue-router'
import backStage from '../views/backStage.vue'
import Login from '../views/Login.vue'
import store from '../store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        /* 购物车模块 */
        path: '/cmDetails',
        component: () => import('../views/commodityDetails.vue'),
        name: 'commodityDetails'
      },
      {
        /* 购物车模块 */
        path: '/Order',
        component: () => import('../views/Order.vue'),
        name: 'Order',
        meta: {
          requireLogin: true
        }
      },
      {
        path: '/Shopping_Car',
        component: () => import('../views/Shopping_Car.vue'),
        meta: {
          requireLogin: true
        }
      },
      {
        path: '/Shopping',
        component: () => import('../views/Shopping.vue'),
        meta: {
          include: true
        }
      },
      {
        path: '/orderDetails',
        component: () => import('../views/orderDetails.vue'),
        meta: {
          requireLogin: true
        },
        beforeEnter: (to, from, next) => {
          if (store.state.user.userAddressList == '') {
            window.alert('请先添加购物地址')
            router.push('/backStage/personal')
            next(false)
          } else {
            window.alert('确认订单')
            next()
          }
        }
      },
    ]
  },
  {
    path: '/backStage',
    meta: {
      requireLogin: true,
      include: true
    },
    component: () => import('../views/backStage.vue'),
    //子路由路径前加/表示绝对路径 不加/会自动添加上父路由路径
    children: [
      {
        path: 'user',
        component: () => import('../views/backStageRouter/userRoute.vue'),
        name: 'user',
        meta: {
          requireLogin: true,
          include: true
        }
      },

      {
        path: 'order',
        component: () => import('../views/backStageRouter/orderRoute.vue'),
        name: 'order',
        meta: {
          requireLogin: true,
          include: true
        }
      },
      {
        path: 'shop',
        name: 'shop',
        component: () => import('../views/backStageRouter/shopRoute.vue'),
        meta: {
          requireLogin: true,
          include: true
        }
      },
      {
        path: 'shopCar',
        name: 'shopCar',
        component: () => import('../views/backStageRouter/shoppingCarRoute.vue'),
        meta: {
          requireLogin: true,
          include: true
        }
      },
      {
        path: 'personal',
        name: 'personal',
        component: () => import('../views/backStageRouter/personalRoute.vue'),
        meta: {
          requireLogin: true,
          include: true
        }
      }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/Login',
    component: Login,
    name: 'Login'
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition && to.meta.include) {
      return savedPosition
    }
    const position = {}
    if (to.path === '/backStage/user' || to.path === '/backStage/personal' || to.path === '/Shopping' || to.path === '/Shopping_Car' || to.path === '/Order') {
      position.selector = '#router-link' //保存此id标签的位置属性
      return position
    }
    if (to.hash) {
      position.selector = to.hash //保存此id标签的位置属性
      return position
    }
  }
})
// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
export default router
