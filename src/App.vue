<template>
    <v-app>
        <Map />

        <div class="main">
            <div class="search-field-and-calculate-route-button-container">
                <SearchField class="clickable mr-2" />
                <CalculateRouteButton class="clickable" />
            </div>

            <div
                v-if="$vuetify.breakpoint.mobile"
                class="recommendations-slide-container clickable"
            >
                <RecommendationSlider />
            </div>
            <div v-else class="recommendations-scroll-container clickable">
                <RecommendationScroll />
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
import RecommendationScroll from '@/components/groups/RecommendationScroll'
import RecommendationSlider from '@/components/groups/RecommendationSlider'

export default {
    name: 'App',

    components: {
        RecommendationSlider,
        RecommendationScroll,
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
    justify-content: space-between;
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

.recommendations-slide-container {
    overflow: auto;
    transform: rotateX(180deg);
}
::-webkit-scrollbar {
    display: none;
}
</style>
