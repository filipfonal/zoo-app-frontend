<template>
  <div class="user-recent-reviews">
    <v-card class="mx-auto" max-width="900">
      <v-card-text>
        <div>Recent Reviews</div>
        <div class="reviews text--primary">
          <div class="row" v-for="review in user.reviews" :review="review">
            <div class="col-md-4">
              <div class="tab-title">Zoo:</div>
              <router-link :to="{name: 'zoo', params: {id: review.zooId}}" class="username">
                <p class="review-user">{{ review.id }}</p>
              </router-link>
              <div class="tab-title">Rating:</div>
              <star-rating
                      :rating="review.rating"
                      :increment="0.1"
                      read-only
                      :show-rating="false"
                      :star-size="15"/>
            </div>
            <div class="col-md-8">
              {{ review.content }}
            </div>
          </div>
          <v-divider/>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {User} from '@/models/User';

@Component
export default class UserRecentReviews extends Vue {
    @Prop() public user?: User;
}
</script>

<style lang="scss" scoped>
  .tab-title {
    font-weight: bold;
  }
</style>
