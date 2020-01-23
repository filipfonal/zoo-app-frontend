<template>
  <div class="friends">
    <v-card class="mx-auto" max-width="900">
      <v-card-text>
        <div class="reviews text--primary" v-if="friends && friends.length">
          <div>Your Friends</div>
          <div class="row" v-for="friend in friends">
            <div class="col-md-12">
              <router-link :to="{name: 'user', params: {id: friend.id}}" class="username">
                {{ friend.name }}
              </router-link>
            </div>
          </div>
          <v-divider/>
        </div>
        <div v-else>
          There are no friends
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
    import Component from 'vue-class-component';
    import Vue from 'vue';
    import UserHeader from '@/components/UserHeader.vue';
    import UserReviews from '@/components/UserReviews.vue';
    import UserFavourites from '@/components/UserFavourites.vue';
    import {GET_FRIEND_LIST} from '@/graphql/queries';
    import { apolloClient } from '@/main';

    @Component({
        components: {
            UserHeader,
            UserReviews,
            UserFavourites,
        },
    })
    export default class Friend extends Vue {
        [x: string]: any;
        private friends: object | null = null;

        get authData() {
            return this.$store.getters.authData;
        }

        public created(): void {
            apolloClient.query({
                query: GET_FRIEND_LIST,
            }).then((response) => {
                this.friends = response.data.friendList;
            }, ({graphQLErrors}) => {
                this.$store.dispatch('notify', {
                    type: 'error',
                    message: graphQLErrors[0].message,
                });
            });
        }
    }
</script>

<style lang="scss" scoped>
  .card{
    padding-bottom: 50px;
  }
  .friends{
    padding-top: 25px;
  }
  .username{
    text-decoration: none;
    color: black;
    font-weight: bold;
  }
  .username:hover{
    color: #2196f3;
  }
</style>
