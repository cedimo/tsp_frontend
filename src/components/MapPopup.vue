<template>
    <v-card v-if="$store.state.isPopupVisible" class="mt-1 pa-3 card">
        <v-card-title class="pa-0 pb-2">
            {{ feature.get('name') }}
        </v-card-title>
        <v-btn rounded class="primary text-none" @click="removeFeature"
            >Entfernen</v-btn
        >
    </v-card>
</template>

<script>
import Feature from 'ol/Feature'
import { store } from '@/store'

export default {
    name: 'MapPopup',
    props: {
        feature: {
            type: Feature,
            required: true,
        },
    },
    methods: {
        removeFeature() {
            store.commit('hidePopup')
            if (this.feature.get('isRecommendation')) {
                store.commit('removeRecommendationFeature', this.feature)
            } else {
                store.commit('removeSearchFeature', this.feature)
            }
        },
    },
}
</script>

<style scoped>
.card {
    display: inline-flex;
    flex-direction: column;
}
</style>
