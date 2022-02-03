<template>
    <v-app>
        <v-main>
            <Map />
            <SearchField />
            <CalculateRouteButton absolute top right />
            <RecommendationCard
                :recommendation="$store.state.recommendationFeaturePool[0]"
            />
            <RecommendationCard
                :recommendation="$store.state.recommendationFeaturePool[1]"
            />
        </v-main>
    </v-app>
</template>

<script>
import Map from './components/Map.vue'
import CalculateRouteButton from './components/CalculateRouteButton.vue'
import SearchField from '@/components/SearchField'
import RecommendationCard from '@/components/RecommendationCard'

export default {
    name: 'App',

    components: {
        RecommendationCard,
        Map,
        CalculateRouteButton,
        SearchField,
    },
}
</script>

<style>
/* removes scrollbar when not needed */
html {
    overflow-y: auto !important;
}
</style>
