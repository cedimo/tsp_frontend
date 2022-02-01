<template>
    <v-app>
        <v-main>
            <Map />
            <SearchField />
            <CalculateRouteButton absolute top right />
        </v-main>
    </v-app>
</template>

<script>
import Map from './components/Map.vue'
import CalculateRouteButton from './components/CalculateRouteButton.vue'
import SearchField from '@/components/SearchField'

export default {
    name: 'App',

    components: {
        Map,
        CalculateRouteButton,
        SearchField,
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
