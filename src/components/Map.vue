<template>
    <div>
        <div ref="map" class="map"></div>
        <div ref="popup" class="ol-popup"></div>
    </div>
</template>

<script>
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { fromLonLat, transformExtent } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { Icon, Stroke, Style } from 'ol/style'
import XYZ from 'ol/source/XYZ'
import Overlay from 'ol/Overlay'
import { store } from '@/store'

export default {
    name: 'Map',
    mounted() {
        // popup
        const popupContainer = this.$refs['popup']
        const popupOverlay = new Overlay({
            element: popupContainer,
            autoPan: true,
            autoPanAnimation: {
                duration: 250,
            },
        })

        const osm_layer = new TileLayer({
            source: new XYZ({
                url: 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}.png',
                attributions:
                    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, ' +
                    '&copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>, ' +
                    '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            }),
        })

        // Style, Source and Layer for Recommendations
        const recommendations_style = new Style({
            image: new Icon({
                scale: 0.8,
                anchor: [0.5, 42],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: './map-marker_blue.png',
            }),
        })

        const recommendations_source = store.state.recommendationFeatures

        const recommendations_layer = new VectorLayer({
            source: recommendations_source,
            style: recommendations_style,
        })

        // Style, Source and Layer for Search Results
        const search_style = new Style({
            image: new Icon({
                scale: 0.8,
                anchor: [0.5, 42],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: './map-marker_red.png',
            }),
        })

        const search_source = store.state.searchFeatures

        const search_layer = new VectorLayer({
            source: search_source,
            style: search_style,
        })

        // Style, Source and Layer for final Route
        const route_style = new Style({
            stroke: new Stroke({
                width: 3,
                color: [5, 69, 162],
            }),
        })

        const route_source = new VectorSource()

        const route_layer = new VectorLayer({
            source: route_source,
            style: route_style,
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

        const mannheim_view = new View({
            center: mannheimCenter,
            zoom: 14,
            extent: mannheimExtent,
            minZoom: 10,
            maxZoom: 20,
            constrainResolution: true,
        })
        store.commit('initializeMapView', mannheim_view)

        const map = new Map({
            target: this.$refs['map'],
            layers: [
                osm_layer,
                route_layer,
                recommendations_layer,
                search_layer,
            ],
            view: mannheim_view,
            overlays: [popupOverlay],
        })

        map.on('click', event => {
            popupOverlay.setPosition(map.getCoordinateFromPixel(event.pixel))
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

/* style for popup */
.ol-popup {
    position: absolute;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #000000;
    bottom: 12px;
    left: -50px;
    min-width: 200px;
}

/* TODO: do we need this? -> popup custom css*/
.ol-popup:after,
.ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}
</style>
