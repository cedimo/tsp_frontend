<template>
    <v-app>
        <Map />

        <div class="main">
            <div
                class="search-field-and-calculate-route-button-container mx-3 mt-3"
            >
                <SearchField class="clickable" />
                <CalculateRouteButton class="clickable ml-3" />
            </div>

            <div
                v-if="$vuetify.breakpoint.mobile"
                class="recommendations-slide-container clickable mb-3"
            >
                <RecommendationSlider />
            </div>
            <div v-else class="recommendations-scroll-container clickable ml-3">
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
import RecommendationScroll from '@/components/RecommendationScroll'
import RecommendationSlider from '@/components/RecommendationSlider'

export default {
    name: 'App',

    components: {
        RecommendationSlider,
        RecommendationScroll,
        Map,
        CalculateRouteButton,
        SearchField,
    },

    data() {
        return {
            windowHeight: window.innerHeight,
        }
    },

    mounted() {
        const doc = document.documentElement
        doc.style.setProperty('--app-height', `${this.windowHeight}px`)
        window.addEventListener('resize', this.onResize)
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },

    methods: {
        onResize() {
            this.windowHeight = window.innerHeight
            const doc = document.documentElement
            doc.style.setProperty('--app-height', `${this.windowHeight}px`)
        },
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
    height: var(--app-height);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.clickable {
    pointer-events: auto;
}

.search-field-and-calculate-route-button-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
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
