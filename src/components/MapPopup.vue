<!--TODO: popup positioning-->
<template>
    <v-card v-if="$store.state.isPopupVisible" class="pa-3 card">
        <v-card-title> {{ feature.get('name') }} </v-card-title>
        <v-btn @click="removeFeature">Entfernen</v-btn>
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
