<template>
  <v-card>
    <v-card-title>
      <span class="headline">Your feedback on {{ zoo.name }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="heading">Your rating</div>
            <v-rating v-model="rating"
                      color="yellow darken-3"
                      background-color="grey darken-1"
                      empty-icon="$ratingFull"
                      hover
            ></v-rating>
            <template v-slot:label>
              <div>
                Your opinion
              </div>
            </template>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea v-model="content">
              <template v-slot:label>
                <div>
                  Your opinion
                </div>
              </template>
            </v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close">Close</v-btn>
      <v-btn color="blue darken-1" text @click="attemptSubmitReview()">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    import {Zoo} from '@/models/Zoo';
    import {Review} from '@/models/Review';

    @Component({})
    export default class ReviewAddForm extends Vue {
        @Prop() public zoo?: Zoo;
        @Prop() public review?: Review;

        private rating: number = 0;
        private content: string = '';

        private isValidForSubmit(): boolean {
            return this.content !== '' && this.rating >= 1 && this.rating <= 5;
        }

        private invalidFormAlert(): void {
            this.$store.dispatch('notify', {
                type: 'warning',
                message: 'Please fill up all fields',
            });
        }

        private attemptSubmitReview(): void {
            if (!this.isValidForSubmit()) {
                this.invalidFormAlert();
                return;
            }

            if (this.zoo) {
                this.$emit('submitReview', {
                    zooId: this.zoo.id,
                    rating: this.rating,
                    content: this.content,
                });
            }
        }

        private close(): void {
            this.$emit('closeDialog');
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
