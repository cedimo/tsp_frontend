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
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { store } from '@/store'

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
            // TODO: check if theres a better way to check for empty result
            if (features == '') {
                throw 'Keine Ergebnisse für gesuchten Ort'
            }

            const first_result = features[0]
            const coord = first_result.getGeometry().getCoordinates()

            // checken, ob Ergebnis außerhalb Region liegt
            if (
                coord[0] > 8.763680406565726 ||
                coord[0] < 8.254876112965539 ||
                coord[1] > 49.60908933136416 ||
                coord[1] < 49.36241310691181
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

            this.addFeature(featureName, coord)

            // clear input field
            this.input = ''
        },

        // TODO: add feature to overlay/features in store
        // TODO: unique identifier
        addFeature(name, coord) {
            // neues Feature erstellen
            const feature = new Feature({
                name: name,
                geometry: new Point(fromLonLat(coord)),
                recommendation: false,
                id: 42,
            })

            // TODO: Feature zu Karte hinzufügen
            store.commit('addSearchFeature', feature)
        },

        // TODO: error handling
        handleError(error) {
            alert(error)
            // this.search_error = true
            // setTimeout(() => (this.search_error = false), 4000)
        },
    },
}
</script>

<style scoped>
.search-field {
    max-width: 400px;
}
</style>
