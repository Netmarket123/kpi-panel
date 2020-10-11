//import "bootstrap/dist/css/bootstrap.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import './plugins/vuetify';
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false;
router.beforeEach((to,from, next) =>{
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!store.getters.loggedIn){
      next({
        name:'login',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  render: (h) => h(App),
  store:store,
}).$mount("#app");
