<template>
  <div>
    <div class="user-view" v-if="user">
      <UserHeader :user="user" :authData="authData" :isFriend="isFriend"/>
      <UserFavourites :user="user" :authData="authData" :isFriend="isFriend" :favourites="favourites"/>
      <UserReviews :user="user" :authData="authData"/>
    </div>
    <div class="text-center" v-else>
      <v-progress-circular class="spinner"
              indeterminate
              color="primary"/>
    </div>
  </div>
</template>

<script lang="ts">
    import Component from 'vue-class-component';
    import Vue from 'vue';
    import {apolloClient} from '@/main';
    import {GET_FRIEND_FAVOURITES, GET_SINGLE_USER, GET_OWN_FAVOURITES} from '@/graphql/queries';
    import UserHeader from '@/components/UserHeader.vue';
    import UserReviews from '@/components/UserReviews.vue';
    import UserFavourites from '@/components/UserFavourites.vue';

    @Component({
        components: {
            UserHeader,
            UserReviews,
            UserFavourites,
        },
    })
    export default class User extends Vue {
        [x: string]: any;
        private user: User | null = null;
        private isFriend: boolean = false;
        private favourites: object = [];

        get authData() {
            return this.$store.getters.authData;
        }

        public created(): void {
            apolloClient.query({
                query: GET_SINGLE_USER,
                variables: {
                    id: this.$route.params.id,
                },
            }).then((response) => {
                this.user = response.data.user;
                response.data.user.id === this.authData.id ? this.fetchAuthFavourites() : this.fetchFriendFavourites();
            }, ({graphQLErrors}) => {
                this.$store.dispatch('notify', {
                    type: 'error',
                    message: graphQLErrors[0].message,
                });
                this.$router.push('/');
            });
        }

        public fetchAuthFavourites() {
            if (this.user) {
                apolloClient.query({
                    query: GET_OWN_FAVOURITES,
                }).then((response) => {
                    this.favourites = response.data.myFavourites;
                }, ({graphQLErrors}) => {
                    this.$store.dispatch('notify', {
                        type: 'error',
                        message: graphQLErrors[0].message,
                    });
                });
            }
        }

        public fetchFriendFavourites() {
            if (this.user) {
                apolloClient.query({
                    query: GET_FRIEND_FAVOURITES,
                    variables: {
                        email: this.user.email,
                    },
                }).then((response) => {
                    this.favourites = response.data.friendFavourites;
                    this.isFriend = true;
                }, ({graphQLErrors}) => {
                    this.$store.dispatch('notify', {
                        type: 'error',
                        message: graphQLErrors[0].message,
                    });
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
  .card {
    padding-bottom: 50px;
  }

  .spinner {
    padding-top: 100px;
  }
</style>
