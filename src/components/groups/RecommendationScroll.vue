<template>
    <vue-scroll>
        <RecommendationCard
            v-for="(recommendation, index) in $store.state
                .recommendationFeaturePool"
            :key="index"
            :recommendation="recommendation"
            class="recommendation-card"
        />
    </vue-scroll>
</template>

<script>
import RecommendationCard from '@/components/RecommendationCard'
export default {
    name: 'RecommendationScroll',
    components: { RecommendationCard },
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
</style>
