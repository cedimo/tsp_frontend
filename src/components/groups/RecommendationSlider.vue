<!--TODO: add horizontal scroll for small browser window (atm: Shift + Scroll)-->
<template>
    <div class="slide-container">
        <RecommendationCard
            v-for="(recommendation, index) in $store.state
                .recommendationFeaturePool"
            :key="index"
            :recommendation="recommendation"
            class="recommendation-card"
        />
    </div>
</template>

<script>
import RecommendationCard from '@/components/RecommendationCard'
export default {
    name: 'RecommendationSlider',
    components: { RecommendationCard },
}
</script>

<style scoped>
.slide-container {
    display: inline-flex;
    flex-direction: row;
    transform: rotateX(180deg);
}
.recommendation-card + .recommendation-card {
    margin-left: 12px;
}
</style>
