import Vue from 'vue'
import vuescroll from 'vuescroll'

Vue.use(vuescroll, {
    ops: {
        rail: {
            opacity: '1',
            background: '#C7C7C7B2',
        },
        bar: {
            keepShow: true,
            background: '#616161B3',
        },
    },
})
export default vuescroll
