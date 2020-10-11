<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 lg5 x14>
      <v-card>
        <v-toolbar dark  style="background-color: #002060">
          <v-toolbar-title >
            Acceso al Sistema
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="email" autofocus color="accent" label="Email" required></v-text-field>
          <v-text-field v-model="password" type="password" color="accent" label="Password" required></v-text-field>
          <v-flex class="red--text" v-if="errorM">{{errorM}}</v-flex>
        </v-card-text>
        <v-card-actions class="px-3 pb-3">
          <v-flex text-xs-right>
            <v-btn @click="login" style="background-color: #002060;color: white">Ingresar</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import { mdbInput, mdbBtn } from 'mdbvue';
  export default {
    name: 'login',
    components: {
      mdbInput,
      mdbBtn
    },
    data(){
      return {
        email:'',
        password:'',
        errorM:null,
      }
    },
    methods:{
      login(){
        console.log(this.$store);
        this.$store.dispatch("LOGIN",{
          email:this.email,
          password:this.password
        }).then(success =>{
          this.$router.push("/gantt")
        }).catch(error =>{
          this.errorM=null;
          // if (error.response.status==500){
          //   this.errorM='Ocurrió un error con el servidor';
          // } else if (error.response.status==404){
          //   this.errorM='No existe el usuario o las credenciales son incorrectas';
          // } else{
            this.errorM=error;
          // }
        })
      }
    }
  }
</script>