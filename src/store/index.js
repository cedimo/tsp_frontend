import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        recommendations: [
            {
                name: 'DHBW Mannheim',
                coords: {
                    lat: 49.473943852427404,
                    lon: 8.534472542405988,
                },
                imgSrc: 'https://www.rnz.de/cms_media/module_img/868/434110_1_org_image_22d6a17e05057c56.jpg',
                selected: false,
            },
            {
                name: 'Wasserturm',
                coords: {
                    lat: 49.4840557,
                    lon: 8.475605269250934,
                },
                imgSrc: 'https://mein.toubiz.de/api/v1/article/b8c1adf3-d583-4da0-82cc-e72ecbbae16d/mainImage?format=image/webp&width=1900',
                selected: false,
            },
            {
                name: 'Barockschloss',
                coords: {
                    lat: 49.48368310000001,
                    lon: 8.461492107098428,
                },
                imgSrc: 'https://mein.toubiz.de/api/v1/article/c9c86453-4f74-4ecd-a500-be20dacc56d4/mainImage?format=image/webp&width=1900',
                selected: false,
            },
            {
                name: 'Jesuitenkirche',
                coords: {
                    lat: 49.48625099999998,
                    lon: 8.460728274219452,
                },
                imgSrc: 'https://mein.toubiz.de/api/v1/article/ac212090-01fe-469f-8edc-b22fddc8b555/mainImage?format=image/webp&width=1900',
                selected: false,
            },
            {
                name: 'Luisenpark',
                coords: {
                    lat: 49.48336524999999,
                    lon: 8.496241981052073,
                },
                imgSrc: 'https://mein.toubiz.de/api/v1/article/10852955-c036-4479-9157-e17b6c9fde80/mainImage?format=image/webp&width=1900',
                selected: false,
            },
            {
                name: 'Fernmeldeturm',
                coords: {
                    lat: 49.48694004999999,
                    lon: 8.492173125,
                },
                imgSrc: 'https://mein.toubiz.de/api/v1/article/faff9885-df3d-45ee-86e3-e0b97d349d04/mainImage?format=image/webp&width=1900',
                selected: false,
            },
            {
                name: 'Alte Feuerwache',
                coords: {
                    lat: 49.49576020000001,
                    lon: 8.4742428,
                },
                imgSrc: 'https://mein.toubiz.de/api/v1/article/30dc387b-d098-4e1e-9dbc-46d9c287bf9c/mainImage?format=image/webp&width=1900',
                selected: false,
            },
            {
                name: 'Alte Sternwarte',
                coords: {
                    lat: 49.48650375,
                    lon: 8.459711111574869,
                },
                imgSrc: 'https://mein.toubiz.de/api/v1/article/6727705d-e177-4598-8e4a-5df2ad94da80/mainImage?format=image/webp&width=1900',
                selected: false,
            },
            {
                name: 'Altes Rathaus',
                coords: {
                    lat: 49.48911494999999,
                    lon: 8.467165809807387,
                },
                imgSrc: 'https://mein.toubiz.de/api/v1/article/c4c18dfc-a231-4c77-906d-2f5cd8737c23/mainImage?format=image/webp&width=1900',
                selected: false,
            },
            {
                name: 'Kunsthalle',
                coords: {
                    lat: 49.48260805,
                    lon: 8.475420936235954,
                },
                imgSrc: 'https://mein.toubiz.de/api/v1/article/5c5f59a8-3932-4fcb-b09b-c35a3cf91432/mainImage?format=image/webp&width=1900',
                selected: false,
            },
        ],
    },
    mutations: {
        toggleRecommendation(state, index) {
            const recommendation = state.recommendations[index]
            recommendation.selected = !recommendation.selected
        },
    },
    actions: {},
    modules: {},
})
