<template>
  <v-card>
  <v-card-text>
    Search zoo
    <div class="row">
      <div class="col-md-9">
        <v-autocomplete label="City e.g. London"
                        :items="cities"
                        :search-input.sync="city"
                        item-text="name"
                        single-line
                        autofocus
                        hideNoData
                        color="amber">
        </v-autocomplete>
        <br>
        <v-slider
                v-model="range"
                label="Szukaj w odległości (km)"
                step="10"
                min="0"
                max="500"
                thumb-label="always"
                ticks
                color="amber">
        </v-slider>
      </div>
      <div class="col-md-3 d-flex justify-center align-center">
        <v-btn color="amber" fab x-large dark @click="search()">
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
import {ZooSearchForm} from "@/models/ZooSearchForm";
import {City} from "@/models/City";

@Component
export default class Search extends Vue {
    @Prop() private cities: City[];
    private city = '';
    private range = 0;

    private created(): void {
        this.$watch('city', _.debounce((value) => {
            if (value) {
                this.$emit('searchCities', value);
            }
        }, 300));
    }

    private search(): void {
        this.$emit('searchZoo', this.getSearchFormData());
    }

    private getSearchFormData(): ZooSearchForm {
        let city = this.getFullCityObject(this.city);

        return {
            latitude: city.location.latitude,
            longitude: city.location.longitude,
            range: this.range
        }
    }

    private getFullCityObject(cityName: string): City {
        return <City>this.cities.find(city => city.name === cityName);
    }
}
</script>

<style scoped>
</style>
