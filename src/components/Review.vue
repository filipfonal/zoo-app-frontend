<template>
  <div class="review">
    <div class="row">
      <div class="col-md-4">
        <router-link :to="{name: 'user', params: {id: review.user.id}}" class="username">
          <p class="review-user">{{ review.user.name }}</p>
        </router-link>
        <p class="review-date">{{ review.createdAt }}</p>
        <star-rating
                :rating="review.rating"
                :increment="0.1"
                read-only
                :show-rating="false"
                :star-size="15"/>
        <div class="options" v-if="myReview && myReview.id === review.id">
          <DeleteReview :review="review" />
          <EditReview :review="review" />
        </div>
      </div>
      <div class="col-md-8">
        {{ review.content }}
      </div>
    </div>
    <v-divider/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {Review as ReviewModel} from '@/models/Review';
import DeleteReview from '@/components/DeleteReview.vue';
import EditReview from '@/components/EditReview.vue';

@Component({
    components: {
        EditReview,
        DeleteReview,
    },
})

export default class Review extends Vue {
    @Prop() public review?: ReviewModel;
    @Prop() public myReview?: ReviewModel;
}
</script>

<style lang="scss" scoped>
  .review{
    width: 100%;
    .username{
      text-decoration: none !important;
      color: black;
    }
    .username:hover{
      color: #2196f3;
    }
    .review-user{
      margin-bottom: 0;
      font-weight: bold;
    }
    .review-date{
      margin-bottom: 0;
    }
    .options{
      display: flex;
      padding-top: 10px;
    }
  }
</style>
