<template>
    <v-btn
        v-bind="$attrs"
        rounded
        x-large
        class="success white--text text-none"
        :loading="loading"
        @click="onButtonClick"
    >
        Route erstellen
    </v-btn>
</template>

<script>
import { store } from '@/store'
import { toLonLat } from 'ol/proj'
import GeoJSON from 'ol/format/GeoJSON'
export default {
    name: 'CalculateRouteButton',
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        async onButtonClick() {
            this.loading = true

            const coordsToOptimize = this.getSelectedFeatures()
            const routeFeature = await this.getOptimizedRouteFromBackend(
                coordsToOptimize
            )

            if (routeFeature) {
                store.commit('setRouteFeature', routeFeature)
            }

            this.loading = false
        },

        getSelectedFeatures() {
            const coordsFromFeaturesOnMap = []
            store.state.recommendationFeatures
                .getFeatures()
                .forEach(feature => {
                    const featureCoords = toLonLat(
                        feature.getGeometry().getCoordinates()
                    )
                    coordsFromFeaturesOnMap.push(featureCoords)
                })

            store.state.searchFeatures.getFeatures().forEach(feature => {
                const featureCoords = toLonLat(
                    feature.getGeometry().getCoordinates()
                )
                coordsFromFeaturesOnMap.push(featureCoords)
            })

            return coordsFromFeaturesOnMap
        },

        async getOptimizedRouteFromBackend(coordsToOptimize) {
            if (coordsToOptimize.length < 3) {
                const error_msg = 'Bitte mindestens 3 Punkte auswählen'
                store.commit('setError', error_msg)
                return
            }

            const jsonBody = JSON.stringify({ locations: coordsToOptimize })
            const backendUrl = 'http://127.0.0.1:8000'

            return await fetch(backendUrl, {
                method: 'POST',
                body: jsonBody,
            })
                .then(response => response.json())
                .then(data => {
                    return new GeoJSON({
                        featureProjection: 'EPSG:3857',
                    }).readFeatures(data)[0]
                })
                .catch(error => {
                    store.commit('setError', error)
                })
        },
    },
}
</script>
