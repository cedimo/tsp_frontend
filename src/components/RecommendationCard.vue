<template>
    <v-card max-width="400">
        <v-img height="150" :src="recommendation.imgSrc"></v-img>

        <div class="d-flex align-center justify-space-between pa-2">
            <v-card-title> {{ recommendation.name }}</v-card-title>
            <v-btn
                rounded
                depressed
                large
                class="recommendation-button text-none"
                :class="{ 'primary test white--text': recommendation.selected }"
                :pressed="recommendation.selected"
                @click="toggleRecommendation"
            >
                {{ recommendation.selected ? 'Entfernen' : 'Hinzufügen' }}
            </v-btn>
        </div>
    </v-card>
</template>

<script>
import { store } from '@/store'

export default {
    name: 'RecommendationCard',
    props: {
        index: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            recommendation: store.state.recommendations[this.index],
        }
    },

    methods: {
        toggleRecommendation() {
            store.commit('toggleRecommendation', this.index)

            // TODO: store logic if recommendations are toggled
            // const recommendation = store.state.recommendations[this.index]
            // if (recommendation.selected) {
            //     recommendations_source.addFeature(
            //         recommendations_features[this.index]
            //     )
            // } else {
            //     recommendations_source.removeFeature(
            //         recommendations_features[this.index]
            //     )
            // }
        },
    },
}
</script>

<style scoped>
.recommendation-button {
    width: 130px;
}
</style>
