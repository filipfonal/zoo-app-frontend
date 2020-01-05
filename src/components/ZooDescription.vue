<template>
  <div class="zoo-description">
    <v-card class="mx-auto" max-width="900">
      <v-card-text>
        <div>Description</div>
        <p class="display-1 text--primary">
          {{ zoo.name }}
        </p>
        <div class="text--primary">
          {{ zoo.description }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="amber accent-4" :href="zoo.wikipediaLink" target="_blank">
          Learn More
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {Zoo} from "@/models/Zoo";

@Component
export default class ZooDescription extends Vue {
    @Prop() public zoo?: Zoo;

}
</script>

<style lang="scss" scoped>
</style>
