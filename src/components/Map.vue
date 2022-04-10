<template>
    <div>
        <div ref="map" class="map"></div>
        <div ref="popup">
            <MapPopup :feature="popupFeature" />
        </div>
        <div ref="tooltip">
            <v-card v-if="tooltipVisible" class="tooltip">
                {{ tooltipText }}
            </v-card>
        </div>
    </div>
</template>

<script>
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { fromLonLat, transformExtent } from 'ol/proj'
import VectorLayer from 'ol/layer/Vector'
import { Icon, Stroke, Style } from 'ol/style'
import XYZ from 'ol/source/XYZ'
import Overlay from 'ol/Overlay'
import { store } from '@/store'
import MapPopup from '@/components/MapPopup'
import Feature from 'ol/Feature'

export default {
    name: 'Map',
    components: { MapPopup },
    data() {
        return {
            popupFeature: new Feature(),
            tooltipVisible: false,
            tooltipText: '',
        }
    },
    mounted() {
        const popup = this.$refs['popup']
        const popupOverlay = new Overlay({
            element: popup,
            positioning: 'top-center',
        })

        const tooltip = this.$refs['tooltip']
        const tooltipOverlay = new Overlay({
            element: tooltip,
            positioning: 'top-center',
        })

        const osmLayer = new TileLayer({
            source: new XYZ({
                url: 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}.png',
                attributions:
                    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, ' +
                    '&copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>, ' +
                    '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            }),
        })

        // Style, Source and Layer for Recommendations
        const recommendationsStyle = new Style({
            image: new Icon({
                scale: 0.8,
                anchor: [0.5, 42],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: './map-marker_blue.png',
            }),
        })

        const recommendationsSource = store.state.recommendationFeatures

        const recommendationsLayer = new VectorLayer({
            source: recommendationsSource,
            style: recommendationsStyle,
        })

        // Style, Source and Layer for Search Results
        const searchStyle = new Style({
            image: new Icon({
                scale: 0.8,
                anchor: [0.5, 42],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: './map-marker_red.png',
            }),
        })

        const searchSource = store.state.searchFeatures

        const searchLayer = new VectorLayer({
            source: searchSource,
            style: searchStyle,
        })

        // Style, Source and Layer for final Route
        const routeStyle = new Style({
            stroke: new Stroke({
                width: 3,
                color: [5, 69, 162],
            }),
        })

        const routeSource = store.state.routeFeatures

        const routeLayer = new VectorLayer({
            source: routeSource,
            style: routeStyle,
        })

        // create View for Mannheim
        const mannheimCenter = fromLonLat([
            8.475607278125945, 49.48411101954501,
        ])
        const mannheimExtent = transformExtent(
            [
                8.254876112965539, 49.36241310691181, 8.763680406565726,
                49.60908933136416,
            ],
            'EPSG:4326',
            'EPSG:3857'
        )

        const mannheimView = new View({
            center: mannheimCenter,
            zoom: 14,
            extent: mannheimExtent,
            minZoom: 10,
            maxZoom: 20,
            constrainResolution: true,
        })
        store.commit('initializeMapView', mannheimView)

        const map = new Map({
            target: this.$refs['map'],
            layers: [osmLayer, routeLayer, recommendationsLayer, searchLayer],
            view: mannheimView,
            overlays: [popupOverlay, tooltipOverlay],
        })

        map.on('click', event => {
            store.commit('hidePopup')
            map.forEachFeatureAtPixel(event.pixel, feature => {
                if (feature.get('name')) {
                    this.popupFeature = feature
                    const featureCoords = feature.getGeometry().getCoordinates()
                    store.commit('setMapCenter', featureCoords)
                    popupOverlay.setPosition(featureCoords)
                    store.commit('showPopup')
                }
            })
        })

        map.on('pointermove', event => {
            this.tooltipVisible = false
            map.forEachFeatureAtPixel(event.pixel, feature => {
                if (feature.get('name')) {
                    this.tooltipText = feature.get('name')
                    this.tooltipVisible = true
                    const featureCoords = feature.getGeometry().getCoordinates()
                    tooltipOverlay.setPosition(featureCoords)
                }
            })
        })
    },
}
</script>

<style>
.map {
    position: absolute;
    width: 100%;
    height: 100%;
}

/* styling for openlayers buttons */
.ol-control button {
    background-color: var(--v-primary-base);
    border: 2px solid black;
    border-radius: 15px;
}

/* move zoom control to lower right */
.ol-zoom {
    left: unset;
    top: unset;
    right: 8px;
    bottom: 40px;
}

.tooltip {
    opacity: 0.75;
    padding: 4px;
    margin-top: 4px;
    color: white !important;
    background: grey !important;
}
</style>
