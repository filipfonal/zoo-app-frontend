<template>
  <div class="review">
    <div class="row">
      <div class="col-md-4">
        <p class="review-user">{{ review.user.name }}</p>
        <p class="review-date">{{ review.createdAt }}</p>
        <star-rating
                :rating="review.rating"
                :increment="0.1"
                read-only
                :show-rating="false"
                :star-size="15"></star-rating>
      </div>
      <div class="col-md-8">
        {{ review.content }}
      </div>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {Review as ReviewModel} from '@/models/Review';

@Component
export default class Review extends Vue {
    @Prop() public review?: ReviewModel;
}
</script>

<style lang="scss" scoped>
  .review{
    width: 100%;
    .review-user{
      margin-bottom: 0;
      font-weight: bold;
    }
    .review-date{
      margin-bottom: 0;
    }
  }
</style>
