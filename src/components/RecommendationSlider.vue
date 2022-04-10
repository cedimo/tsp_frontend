<template>
    <div class="rotate mx-3 d-inline-flex flex-row">
        <v-card
            v-for="(recommendation, index) in $store.state
                .recommendationFeaturePool"
            :key="index"
            class="recommendation-card"
            @click="toggleRecommendation(recommendation)"
        >
            <v-img height="120" :src="recommendation.get('imgSrc')"></v-img>
            <v-card-title> {{ recommendation.get('name') }}</v-card-title>

            <v-overlay absolute :value="recommendation.get('selected')">
                <v-icon x-large>mdi-check</v-icon>
            </v-overlay>
        </v-card>
    </div>
</template>

<script>
import { store } from '@/store'

export default {
    name: 'RecommendationSlider',
    methods: {
        toggleRecommendation(recommendation) {
            store.commit('hidePopup')
            if (recommendation.get('selected')) {
                store.commit('removeRecommendationFeature', recommendation)
            } else {
                store.commit('addRecommendationFeature', recommendation)
            }
        },
    },
}
</script>

<style scoped>
.rotate {
    transform: rotateX(180deg);
}

.recommendation-card {
    width: 250px;
}

.recommendation-card + .recommendation-card {
    margin-left: 12px;
}
</style>
