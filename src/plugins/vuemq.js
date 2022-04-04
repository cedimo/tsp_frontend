import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
    breakpoints: {
        mobile: 1000,
        desktop: Infinity,
    },
})
export default VueMq
