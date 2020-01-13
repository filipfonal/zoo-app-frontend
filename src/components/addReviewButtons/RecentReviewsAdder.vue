<template>
  <v-row>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn text color="amber accent-4" class="review-button" v-on="on">
          Add review
        </v-btn>
      </template>
      <ReviewForm :zoo="zoo" :review="review" @closeDialog="closeDialog" @submitReview="submitReview" />
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    import {Zoo} from '@/models/Zoo';
    import {Review} from "@/models/Review";
    import ReviewForm from '@/components/ReviewForm.vue';

    @Component({
        components: {ReviewForm},
    })
    export default class ZooReviewAdder extends Vue {
        @Prop() public zoo?: Zoo;
        @Prop() public review?: Review;

        private dialog = false;

        private submitReview(data: any): void {
            this.$store.dispatch('submitReview', data).then(() => {
                this.dialog = false;
            });
        }

        private closeDialog(): void {
            this.dialog = false;
        }
    }
</script>

<style scoped lang="scss">
  .heading {
    font-size: 1rem !important;
    padding-bottom: 25px;
  }

  .review-button {
    margin-left: 35px !important;
  }
</style>
