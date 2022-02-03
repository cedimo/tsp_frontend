<template>
    <v-card max-width="400">
        <v-img height="150" :src="recommendation.get('imgSrc')"></v-img>

        <div class="d-flex align-center justify-space-between pa-2">
            <v-card-title> {{ recommendation.get('name') }}</v-card-title>
            <v-btn
                rounded
                depressed
                large
                class="recommendation-button text-none"
                :class="{
                    'primary test white--text': recommendation.get('selected'),
                }"
                :pressed="recommendation.get('selected')"
                @click="toggleRecommendation"
            >
                {{
                    recommendation.get('selected') ? 'Entfernen' : 'Hinzufügen'
                }}
            </v-btn>
        </div>
    </v-card>
</template>

<script>
import { store } from '@/store'
import Feature from 'ol/Feature'

export default {
    name: 'RecommendationCard',
    props: {
        recommendation: {
            type: Feature,
            required: true,
        },
    },

    methods: {
        toggleRecommendation() {
            if (this.recommendation.get('selected')) {
                store.commit('removeRecommendationFeature', this.recommendation)
            } else {
                store.commit('addRecommendationFeature', this.recommendation)
            }
        },
    },
}
</script>

<style scoped>
.recommendation-button {
    width: 130px;
}
</style>
