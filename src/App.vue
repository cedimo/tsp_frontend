<template>
    <v-app>
        <Map />

        <div class="main">
            <div class="search-field-and-calculate-route-button-container">
                <SearchField class="clickable" />
                <CalculateRouteButton class="clickable" />
            </div>

            <!--TODO: add horizontal slider for mobile view-->
            <div class="recommendations-scroll-container clickable">
                <vue-scroll>
                    <RecommendationCard
                        v-for="(recommendation, index) in $store.state
                            .recommendationFeaturePool"
                        :key="index"
                        :recommendation="recommendation"
                        class="recommendation-card"
                    />
                </vue-scroll>
            </div>
        </div>

        <v-snackbar
            v-model="$store.state.error.active"
            :timeout="$store.state.error.timeout"
            top
            color="error"
        >
            {{ $store.state.error.message }}
        </v-snackbar>
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

.main {
    pointer-events: none;
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 12px;
}

.clickable {
    pointer-events: auto;
}

.search-field-and-calculate-route-button-container {
    display: flex;
    justify-content: space-between;
}

.recommendations-scroll-container {
    overflow: auto;
    width: fit-content;
}

.recommendation-card + .recommendation-card {
    margin-top: 12px;
    margin-right: 12px;
}
</style>
