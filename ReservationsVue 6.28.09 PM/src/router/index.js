import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/Hello'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import LoginRestaurant from '@/components/LoginRestaurant'
import HelloRestaurant from '@/components/HelloRestaurant'
import AddTable from "@/components/AddTable"
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/loginRestaurant',
      name: 'LoginRestaurant',
      component: LoginRestaurant
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/addTable',
      name: 'addTalbe',
      component: AddTable,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
      meta: {
        requiresAuth: true
      }
    }
    ,{
      path: '/helloRestaurant',
      name: 'HelloRestaurant',
      component: HelloRestaurant,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('hello')
  else next()
})

export default router
