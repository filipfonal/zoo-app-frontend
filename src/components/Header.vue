<template>
  <v-app-bar class="app-bar" app color="amber" dark>
    <div class="d-flex align-center">
      <router-link :to="{name: 'home'}" class="header">
        <h2>Zoo App</h2>
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <v-menu :offset-y="true">
      <template v-slot:activator="{ on }">
        <v-btn icon dark color="white" v-on="on">
          <v-icon dark>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>

        <v-list-item @click="logout()">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    @Component
    export default class Header extends Vue {
        private logout() {
            this.$store.dispatch('logout');
        }
    }
</script>

<style scoped>
  .app-bar {
    z-index: 9999 !important;
  }

  .header {
    text-decoration: none;
    color: white;
  }
</style>
