// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import store from './vuex/store'

import App from './App'
import Home from './components/Home.vue'
import todolist from './components/todolist.vue'

import 'bootstrap/dist/css/bootstrap.css'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.use(VueResource)
Vue.use(VueRouter)

const routes=[
  {
    path:'/',
    component:Home
  },
  {
    path:'/todolist',
    component:todolist
  }
];

const router=new VueRouter({routes});

/* eslint-disable no-new */

const app=new Vue({
  store,
  router,
  el:'#app',
  render:h=>h(App)   //ES6语法 
})