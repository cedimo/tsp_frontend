import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
    breakpoint: {
        thresholds: {
            xs: 1000,
            sm: 1000,
            md: 1000,
            lg: 1000,
            // xl breakpoint for bigger devices,
        },
    },
    theme: {
        options: { customProperties: true },
        themes: {
            light: {
                primary: '#0d47a1',
                secondary: '#424242',
                accent: '#82B1FF',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
                error: '#FF5252',
            },
        },
    },
})
