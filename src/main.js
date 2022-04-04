import Vue from 'vue'
import App from './App.vue'
import { store } from './store'
import vuetify from './plugins/vuetify'
import vuescroll from './plugins/vuescroll'
import VueMq from './plugins/vuemq'

Vue.config.productionTip = false

new Vue({
    store,
    vuescroll,
    VueMq,
    vuetify,
    render: h => h(App),
}).$mount('#app')
