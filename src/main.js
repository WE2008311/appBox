// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import store from './vuex/store'

// app主组件
import App from './App'
import Home from './components/Home.vue'
import todolist from './components/todolist.vue'
import player from './components/player.vue'
import popular from './components/popular.vue'
import play from './components/play.vue'
import search from './components/search.vue'
import songsList from './components/songsList.vue'

// bootstrap和JQuery
import 'bootstrap/dist/css/bootstrap.css'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.min.js'

// datetimepicker组件
import './bootstrap-datetimepicker/bootstrap-datetimepicker.min.css'
import './bootstrap-datetimepicker/bootstrap-datetimepicker.min.js'
import './bootstrap-datetimepicker/bootstrap-datetimepicker.zh-CN.js'

// muse-ui组件
import MuseUi from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'

// swiper组件
import VueAwesomeSwiper from 'vue-awesome-swiper'



Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(MuseUi)
Vue.use(VueAwesomeSwiper)

const routes=[
  {
    path:'/',
    component:Home
  },
  {
    path:'/todolist',
    component:todolist
  },
  {
    path:'/player',
    component:player,
    redirect:'/popular',
    children:[
      {
        path:'/popular',
        component:popular
      },
      {
        path:'/play',
        component:play
      },
      {
        path:'/search',
        component:search
      },
      {
        path:'/songsList',
        component:songsList
      }
    ]
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