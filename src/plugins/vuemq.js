import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
    breakpoints: {
        mobile: 900,
        desktop: Infinity,
    },
})
export default VueMq
