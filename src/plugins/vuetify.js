import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
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
