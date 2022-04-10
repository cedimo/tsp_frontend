import Vue from 'vue'
import Vuex from 'vuex'
import VectorSource from 'ol/source/Vector'
import Point from 'ol/geom/Point'
import LineString from 'ol/geom/LineString'
import Feature from 'ol/Feature'
import { fromLonLat } from 'ol/proj'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        mapView: undefined,
        recommendationFeaturePool: [],
        recommendationFeatures: new VectorSource(),
        searchFeatures: new VectorSource(),
        routeFeatures: new VectorSource(),
        isPopupVisible: false,
        error: {
            active: false,
            message: '',
            timeout: 3000,
        },
    },

    mutations: {
        addRecommendationFeature(state, recommendation) {
            store.commit('clearRouteFeatures')
            recommendation.set('selected', true)
            state.recommendationFeatures.addFeature(recommendation)

            store.commit(
                'setMapCenter',
                fromLonLat([
                    recommendation.get('coords').lon,
                    recommendation.get('coords').lat,
                ])
            )
        },

        removeRecommendationFeature(state, recommendation) {
            store.commit('clearRouteFeatures')
            recommendation.set('selected', false)
            state.recommendationFeatures.removeFeature(recommendation)
        },

        addSearchFeature(state, payload) {
            store.commit('clearRouteFeatures')
            const feature = new Feature({
                name: payload.name,
                isRecommendation: false,
                geometry: new Point(fromLonLat(payload.coords)),
                id: state.searchFeatures.getFeatures().length,
            })
            state.searchFeatures.addFeature(feature)
        },

        removeSearchFeature(state, feature) {
            store.commit('clearRouteFeatures')
            state.searchFeatures.removeFeature(feature)
        },

        clearRouteFeatures(state) {
            state.routeFeatures.clear()
        },

        setRouteFeature(state, feature) {
            store.commit('clearRouteFeatures')
            state.routeFeatures.addFeature(feature)
        },

        setMapCenter(state, coordinate) {
            const x = new LineString([coordinate, state.mapView.getCenter()])
            const adjustedDuration = Math.round(x.getLength() / 10) + 200 //minimum duration of 200 added since very small durations appear strange

            state.mapView.animate({
                center: coordinate,
                duration: adjustedDuration,
            })
        },

        showPopup(state) {
            state.isPopupVisible = true
        },

        hidePopup(state) {
            state.isPopupVisible = false
        },

        // TODO: async error handling for case that multiple errors occur in timeout duration
        setError(state, error) {
            state.error.message = error
            state.error.active = true
        },

        initializeRecommendations(state) {
            const mannheimRecommendations = require('../assets/reommendations_mannheim.json')
            state.recommendationFeaturePool = mannheimRecommendations.map(
                recommendation => {
                    return new Feature({
                        name: recommendation.name,
                        coords: recommendation.coords,
                        imgSrc: recommendation.imgSrc,
                        selected: false,
                        isRecommendation: true,
                        geometry: new Point(
                            fromLonLat([
                                recommendation.coords.lon,
                                recommendation.coords.lat,
                            ])
                        ),
                    })
                }
            )
        },

        initializeMapView(state, view) {
            state.mapView = view
        },
    },
    actions: {},
    modules: {},
})

store.commit('initializeRecommendations')
