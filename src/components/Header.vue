<template>
  <v-app-bar app color="amber" dark>
    <div class="d-flex align-center">
      <h2>Zoo App</h2>
    </div>

    <v-spacer></v-spacer>

    <v-btn icon dark color="white">
      <v-icon dark>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Header extends Vue {}
</script>

<style scoped>

</style>
