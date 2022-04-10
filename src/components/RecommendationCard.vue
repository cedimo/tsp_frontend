<template>
    <v-card class="recommendation-card">
        <v-img height="150" :src="recommendation.get('imgSrc')"></v-img>

        <div
            v-if="$vuetify.breakpoint.mobile"
            class="d-flex align-center justify-space-between pa-2"
        >
            <v-card-subtitle> {{ recommendation.get('name') }}</v-card-subtitle>
            <v-btn
                fab
                depressed
                :class="{
                    'primary test white--text': recommendation.get('selected'),
                }"
                :pressed="recommendation.get('selected')"
                @click="toggleRecommendation"
            >
                <v-icon v-if="recommendation.get('selected')">
                    mdi-map-marker-minus-outline
                </v-icon>
                <v-icon v-else> mdi-map-marker-plus-outline </v-icon>
            </v-btn>
        </div>

        <div v-else class="d-flex align-center justify-space-between pa-2">
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
                store.commit('hidePopup')
                store.commit('removeRecommendationFeature', this.recommendation)
            } else {
                store.commit('addRecommendationFeature', this.recommendation)
            }
        },
    },
}
</script>

<style scoped>
.recommendation-card {
    height: fit-content;
}

.recommendation-button {
    width: 130px;
}
</style>
