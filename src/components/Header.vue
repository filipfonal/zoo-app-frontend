<template>
  <v-app-bar app color="amber" dark>
    <div class="d-flex align-center">
      <h2>Zoo App</h2>
    </div>

    <v-spacer></v-spacer>

    <v-btn fab dark small color="teal">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>

<style scoped>

</style>
