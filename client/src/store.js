import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from './router'
import  axios from 'axios';
import {dayOfYearFromWeeks} from "moment/src/lib/units/week-calendar-utils";
Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    token:localStorage.getItem('token') || null,
    usuario:null
  },
  getters:{
    loggedIn(state){
      return state.token != null
    }
  },
  mutations: {
    setToken(state,token){
      state.token=token;
    },
    setUsuario(state,usuario){
      state.usuario=usuario;
    }
  },
  actions: {
    LOGIN:({commit}, payload)=>{
      console.log("this is action", payload);
      return new Promise((resolve , reject)=>{
        axios.post('http://127.0.0.1:5000/api/get_token', payload)
            .then(({data}) =>{
              console.log(data)
              if(data.success == true)
              {
                const token = data.token
                const user = data.user
                commit("setToken", token)
                commit("setUsuario", user)
                localStorage.setItem("token", token)
                resolve(data)
              }
              else {
                reject(data.msg)
              }
            })
            .catch(error =>{
              console.log("This is error",error)
              reject(error)
            })
      })
    },
    guardarToken({commit}, token){
      commit("setToken", token)
      commit("setUsuario", decode(token))
      localStorage.setItem("token", token)
    },
    autoLogin({commit}){
      let token = localStorage.getItem("token");
      if(token){
        commit("setToken",token)
        commit("setUsuario",decode(token))
      }
      router.push({name:'home'});
    },
    salir({commit}){
      commit("setToken", null);
      commit("setUsuario", null);
      localStorage.removeItem("token");
      router.push({name:'login'});
    }
  }
})
