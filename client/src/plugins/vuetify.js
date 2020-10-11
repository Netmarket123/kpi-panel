import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import es from 'vuetify/es5/locale/es'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
Vue.use(Vuetify, {
  theme: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  options: {
    customProperties: true
  },
  iconfont: 'md',
  icons: {
    iconfont: 'mdi',
  },
  lang: {
    locales: { es },
    current: 'es'
  },
})
