<template>
  <v-row>
    <v-dialog v-model="dialog" max-width="410px">
      <template v-slot:activator="{ on }">
        <v-btn class="mx-2" fab dark x-small color="red" v-on="on">
          <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Do you want to delete this review?</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="red darken-1" text @click="attemptDeletion()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    import {Review} from '@/models/Review';

    @Component({})
    export default class DeleteReview extends Vue {
        @Prop() public review?: Review;

        private dialog = false;

        private attemptDeletion() {
            if (this.review) {
                this.$store.dispatch('deleteReview', {
                    id: this.review.id,
                }).then(() => {
                    this.dialog = false;
                });
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
