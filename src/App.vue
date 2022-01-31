<template>
    <v-app>
        <v-main>
            <Map />
            <CalculateRouteButton absolute top right />
        </v-main>
    </v-app>
</template>

<script>
import Map from './components/Map.vue'
import CalculateRouteButton from './components/CalculateRouteButton.vue'

export default {
    name: 'App',

    components: {
        Map,
        CalculateRouteButton,
    },

    data: () => ({
        //
    }),
}
</script>

<style>
/* removes scrollbar when not needed */
html {
    overflow-y: auto !important;
}
</style>
