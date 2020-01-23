<template>
  <div class="zoo-recent-reviews">
    <v-card class="mx-auto" max-width="900">
      <v-card-text>
        <div>Recent Reviews</div>
        <div class="reviews text--primary">
          <Review v-for="review in zoo.recentReviews" :review="review" :myReview="zoo.myReview"/>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="amber accent-4">
          View all
        </v-btn>
        <RecentReviewsAdder :zoo="zoo" class="feedback-button" />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {Zoo} from '@/models/Zoo';
import Review from '@/components/Review.vue';
import RecentReviewsAdder from '@/components/addReviewButtons/RecentReviewsAdder.vue';

@Component({
    components: {
        Review,
        RecentReviewsAdder,
    },
})

export default class ZooRecentReviews extends Vue {
    @Prop() public zoo?: Zoo;
}
</script>

<style lang="scss" scoped>
</style>
