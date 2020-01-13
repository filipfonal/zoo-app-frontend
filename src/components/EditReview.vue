<template>
  <v-dialog v-model="dialog" max-width="410px" v-if="review">
    <template v-slot:activator="{ on }">
      <v-btn class="mx-2" fab dark x-small color="blue" v-on="on">
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Update your feedback</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <div class="heading">Your rating</div>
              <v-rating v-model="reviewUpdateForm.rating"
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
              <v-textarea v-model="reviewUpdateForm.content">
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
        <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
        <v-btn color="blue darken-1" text @click="attemptUpdateReview()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    import {Review} from '@/models/Review';
    import ReviewAddForm from '@/components/ReviewAddForm.vue';

    @Component({
        components: {
            ReviewAddForm,
        },
    })

    export default class EditReview extends Vue {
        @Prop() public review?: Review;

        private dialog = false;
        private reviewUpdateForm: Review = {
            id: '',
            user: {
                id: '',
                name: '',
                email: '',
            },
            zooId: '',
            rating: 0,
            content: '',
            createdAt: '',
        };

        constructor() {
            super();
            if (this.review) {
                this.reviewUpdateForm = {...this.review};
            }
        }

        private attemptUpdateReview(): void {
            this.$store.dispatch('updateReview', {
                id: this.reviewUpdateForm.id,
                rating: this.reviewUpdateForm.rating,
                content: this.reviewUpdateForm.content,
            }).then(() => {
                this.dialog = false;
            });
        }

        private closeDialog(): void {
            if (this.review) {
                this.reviewUpdateForm = {...this.review};
            }
            this.dialog = false;
        }
    }
</script>

<style scoped lang="scss">

</style>
