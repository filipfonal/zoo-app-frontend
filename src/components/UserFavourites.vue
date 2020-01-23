<template>
  <div class="user-favourites">
    <v-card class="mx-auto" max-width="900">
      <v-card-text>
        <div class="reviews text--primary" v-if="favourites && favourites.length">
          <div>Favourite Zoos</div>
          <div class="row" v-for="favourite in favourites">
            <div class="col-md-12">
              <div class="tab-title">Zoo:</div>
              <router-link :to="{name: 'zoo', params: {id: favourite.zooId}}" class="username">
                <p class="review-user">{{ favourite.id }}</p>
              </router-link>
            </div>
          </div>
          <v-divider/>
        </div>
        <div v-else>
          There are no favourite Zoos
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
    export default class UserFavourites extends Vue {
        @Prop() public user?: User;
        @Prop() public authData?: object;
        @Prop() public favourites?: object;
    }
</script>

<style lang="scss" scoped>
  .tab-title {
    font-weight: bold;
  }

  .user-favourites {
    margin-bottom: 25px;
  }
</style>
