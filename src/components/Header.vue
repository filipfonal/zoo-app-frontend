<template>
  <v-app-bar class="app-bar" app color="amber" dark>
    <div class="d-flex align-center">
      <router-link :to="{name: 'home'}" class="header">
        <h2>Zoo App</h2>
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <div v-if="authData  && authData.name">Logged as {{ authData.name }}</div>

    <v-menu :offset-y="true" v-if="isLoggedIn">
      <template v-slot:activator="{ on }">
        <v-btn icon dark color="white" v-on="on">
          <v-icon dark>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <router-link v-if="authData && authData.id" :to="{name: 'user', params: {id: authData.id}}" class="username">
          <v-list-item>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
        </router-link>
        <v-list-item @click="">
          <v-list-item-title>Friends</v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout()">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    export default class Header extends Vue {
        @Prop() public isLoggedIn?: boolean;
        @Prop() public authData?: object;

        private logout() {
            this.$store.dispatch('logout');
        }
    }
</script>

<style scoped>
  .app-bar{
    z-index: 9999 !important;
  }

  .header{
    text-decoration: none;
    color: white;
  }

  .username{
    text-decoration: none !important;
    color: black;
  }
</style>
