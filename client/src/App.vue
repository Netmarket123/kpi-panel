<template>
  <v-app id="app">
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer" v-if="loggedIn"
    >
      <v-list dense>
        <template>
          <v-list-tile>
            <v-list-tile-action><v-icon>home</v-icon></v-list-tile-action>
            <v-list-tile-title>
              Home
            </v-list-tile-title>
          </v-list-tile>
        </template> 
        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  Planning
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: 'tablagantt'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Tabla Datos Planning
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  
            <v-list-tile :to="{name: 'gantt'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  MS Project Gantt
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  Base de Datos y KPI's
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: 'tablabbdd'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Tabla Base de Datos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  
            <v-list-tile :to="{name: 'zkpis'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  KPI's y indicadores
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
              
          </v-list-group>
        </template>        
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="#002060"
      dark
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed 
    >
      <v-toolbar-title style="width: 300px;" class="ml-0 pl-3" >
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Control Panel</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-if="loggedIn">
        <router-link :to="{name:'logout'}">
          <v-icon>logout</v-icon>Salir
        </router-link>
      </v-btn>
      <v-btn icon v-if="!loggedIn"><router-link :to = "{name:'login'}">
        <v-icon>login</v-icon>iniciar sesión</router-link>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer height="auto" >
      <v-layout justify-center>
        <v-flex text-xs-center>
          <v-card flat tile color="primary" class="white--text" >
            <v-card-text class="white--text pt-0" style="background-color:#002060">
              Flask-Vue Webapp @ All rights reserved
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed:{
    loggedIn(){
      return this.$store.getters.loggedIn
    }
  },
  data () {
    return {
      drawer: true,
    }
  }
}
</script>
