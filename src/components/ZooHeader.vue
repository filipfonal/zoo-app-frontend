<template>
  <div class="zoo-wrapper">
    <div class="zoo-header">
      <v-avatar class="zoo-logo" color="white" size="200">
        <v-img v-if="zoo.logo" :src="zoo.logo"></v-img>
        <v-img v-else src="@/assets/zoo.jpg"></v-img>
      </v-avatar>
      <div class="zoo-title">
        <h1>{{ zoo.name }}</h1>
        <star-rating
                :rating="zoo.rating"
                :increment="0.1"
                read-only
                :show-rating="false"
                :star-size="15"></star-rating>
      </div>
      <div class="zoo-buttons-bar">
        <v-btn class="mx-2" fab dark x-small color="pink" @click="addToFavourites()">
          <v-icon dark>mdi-heart</v-icon>
        </v-btn>
        <FeedbackAdder :zoo="zoo" class="feedback-button"/>
      </div>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    import {Zoo} from '@/models/Zoo';
    import FeedbackAdder from '@/components/addReviewButtons/FeedbackAdder.vue';

    @Component({
        components: {
            FeedbackAdder,
        },
    })
    export default class ZooHeader extends Vue {
        @Prop() public zoo?: Zoo;

        private addToFavourites(): void {
            if (this.zoo) {
                this.$store.dispatch('addFavourite', this.zoo.id);
            }
        }
    }
</script>

<style lang="scss" scoped>
  .zoo-wrapper {
    position: relative;
    background-color: #4c442b;
    margin-bottom: 120px;

    &:after {
      content: "";
      background: url("~@/assets/landing.jpg");
      background-position-y: 25%;
      background-size: cover;
      opacity: 0.5;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
    }

    .zoo-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2em 4em;
      position: relative;

      .zoo-logo {
        top: 120px;
        z-index: 1;
      }

      .zoo-title {
        color: #fff;
        text-shadow: 3px 2px 3px rgba(255, 255, 255, .2), 2px 1px 10px #000000;
        position: absolute;
        top: 180px;
        left: 300px;
        z-index: 1;

        h1 {
          margin: 0;
        }
      }

      .zoo-buttons-bar {
        z-index: 1;
        position: relative;
        top: 100px;
        display: flex;

        .feedback-button {
          margin-left: 6px;
        }
      }
    }
  }
</style>
