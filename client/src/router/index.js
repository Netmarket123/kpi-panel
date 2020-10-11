import Vue from "vue";
import vueRouter from "vue-router";

import TablaGantt from "../components/Planning/1.Tabla Gantt.vue";
import Gantt from "../components/Planning/2.Gantt.vue";

import Tabla_BBDD from "../components/ZBBDD_and_KPI/Tabla_BBDD.vue";
import ZKPIs from "../components/ZBBDD_and_KPI/ZKPIs.vue";
import Login from "../components/login.vue";
import  Logout from  "../components/logout";
Vue.use(vueRouter);

export default new vueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
        path: '/',
        redirect: {
            name: "login"
        }
    },{
      path: '/logout',
      name: "logout",
      component: Logout
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta:{
          requiresVisitor:true,
        }
    },
    {
      path: '/tablagantt',
      name: 'tablagantt',
      component: TablaGantt,
      meta: {
        requiresAuth:true,
      }
    },
    {
      path: '/gantt',
      name: 'gantt',
      component: Gantt,
      meta: {
        requiresAuth:true,
      }
    },
    {
      path: '/tablabbdd',
      name: 'tablabbdd',
      component: Tabla_BBDD,
      meta: {
        requiresAuth:true,
      }
    },
    {
      path: '/zkpis',
      name: 'zkpis',
      component: ZKPIs,
      meta: {
        requiresAuth:true,
      }
    }
  ],
});