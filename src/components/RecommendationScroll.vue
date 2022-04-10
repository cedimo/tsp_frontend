<template>
    <vue-scroll>
        <v-card
            v-for="(recommendation, index) in $store.state
                .recommendationFeaturePool"
            :key="index"
            class="recommendation-card"
        >
            <v-img height="150" :src="recommendation.get('imgSrc')"></v-img>

            <div class="d-flex align-center justify-space-between pa-2">
                <v-card-title> {{ recommendation.get('name') }}</v-card-title>
                <v-btn
                    rounded
                    depressed
                    large
                    class="recommendation-button text-none"
                    :class="{
                        primary: recommendation.get('selected'),
                    }"
                    :pressed="recommendation.get('selected')"
                    @click="toggleRecommendation(recommendation)"
                >
                    {{
                        recommendation.get('selected')
                            ? 'Entfernen'
                            : 'Hinzufügen'
                    }}
                </v-btn>
            </div>
        </v-card>
    </vue-scroll>
</template>

<script>
import { store } from '@/store'

export default {
    name: 'RecommendationScroll',
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
.recommendation-card {
    width: 400px;
}

.recommendation-card + .recommendation-card {
    margin-top: 12px;
    margin-right: 12px;
}

.recommendation-button {
    width: 130px;
}
</style>
