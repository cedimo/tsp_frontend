import Vue from 'vue'
import App from './App.vue'
import { store } from './store'
import vuetify from './plugins/vuetify'
import vuescroll from './plugins/vuescroll'

Vue.config.productionTip = false

new Vue({
    store,
    vuescroll,
    vuetify,
    render: h => h(App),
}).$mount('#app')
