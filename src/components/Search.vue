<template>
  <v-card>
  <v-card-text>
    Search zoo
    <div class="row">
      <div class="col-md-9">
        <v-autocomplete label="City e.g. London" :items="cities" :search-input.sync="city" single-line autofocus hideNoData color="amber"></v-autocomplete>
        <br>
        <v-slider
                v-model="range"
                label="Szukaj w odległości (km)"
                step="10"
                min="0"
                max="500"
                thumb-label="always"
                ticks
                color="amber"
        ></v-slider>
      </div>
      <div class="col-md-3 d-flex justify-center align-center">
        <v-btn color="amber" fab x-large dark>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
    </div>
  </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import _ from 'lodash';

export interface City {
    text: string | number | object;
    value: string | number | object;
}

@Component
export default class Search extends Vue {
    @Prop() private cities: Array<City>;
    private city = '';
    private range = 0;

    private created() {
        this.$watch('city', _.debounce((value) => {
            this.$emit('searchCity', value);
        }, 300))
    }
}
</script>

<style scoped>
</style>
