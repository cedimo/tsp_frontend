<template>
    <v-text-field
        v-model="input"
        label="Ort/Adresse suchen"
        placeholder="Ort/Adresse suchen"
        solo
        append-icon="mdi-magnify"
        class="search-field"
        @click:append="onSearchButtonClicked()"
        @keyup.enter="onSearchButtonClicked()"
    ></v-text-field>
</template>

<script>
import GeoJSON from 'ol/format/GeoJSON'
import { store } from '@/store'
import { fromLonLat } from 'ol/proj'

export default {
    name: 'SearchField',
    data() {
        return {
            input: '',
        }
    },
    methods: {
        async onSearchButtonClicked() {
            let queryParam = this.input
            if (queryParam === '') {
                return
            }

            // add Mannheim to query for better results
            // only if query does not include major cities
            // reason: viewbox ("preferred area to find search results") in Nominatim is shit
            if (
                !queryParam.toLowerCase().includes('mannheim') &&
                !queryParam.toLowerCase().includes('heidelberg') &&
                !queryParam.toLowerCase().includes('ludwigshafen')
            ) {
                queryParam = this.input + ' Mannheim'
            }

            this.callNominatimApi(queryParam)
        },

        callNominatimApi(queryParam) {
            const url =
                'https://nominatim.openstreetmap.org/search?q="' +
                queryParam +
                '"&format=geojson'

            fetch(url)
                .then(response => response.json())
                .then(data => this.processNominatimResult(data))
                .catch(error => this.handleError(error))
        },

        processNominatimResult(data) {
            // Feature muss in neues Feature konvertiert werden, weil Ergebnisse in LonLat kommen
            // Karte ist aber Web Mercator
            const features = new GeoJSON().readFeatures(data)

            // checken, ob Query Ergebnis liefert
            // wenn nicht, Fehlermeldung für 3s
            if (features.length === 0) {
                throw 'Keine Ergebnisse für gesuchten Ort'
            }

            const firstResult = features[0]
            const coords = firstResult.getGeometry().getCoordinates()

            // checken, ob Ergebnis außerhalb Region liegt
            if (
                coords[0] > 8.763680406565726 ||
                coords[0] < 8.254876112965539 ||
                coords[1] > 49.60908933136416 ||
                coords[1] < 49.36241310691181
            ) {
                throw 'Suchergebnis außerhalb der Region'
            }

            const featureName = this.input
                .split(' ')
                .reduce((beautifiedFeatureName, word) => {
                    return (
                        beautifiedFeatureName +
                        word[0].toUpperCase() +
                        word.substring(1).toLowerCase() +
                        ' '
                    )
                }, '')
                .trim()

            store.commit('addSearchFeature', {
                name: featureName,
                coords: coords,
            })
            store.commit('setMapCenter', fromLonLat(coords))

            // clear input field
            this.input = ''
        },

        handleError(error) {
            store.commit('setError', error)
        },
    },
}
</script>

<style scoped>
.search-field {
    max-width: 400px;
}
</style>
