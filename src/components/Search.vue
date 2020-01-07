<template>
  <v-card class="search-wrapper" :class="{ 'small': reduceSize }">
    <v-card-text>
      Search zoo
      <div class="row">
        <div :class="{ 'col-md-10': reduceSize, 'col-md-9': !reduceSize }">
          <div class="row">
            <div :class="{ 'col-md-6': reduceSize, 'col-md-12': !reduceSize }">
              <v-autocomplete
                              class="cityInput"
                              label="City e.g. London"
                              :items="cities"
                              :search-input.sync="city"
                              :filter="cityFilter"
                              item-text="fullName"
                              return-object
                              single-line
                              autofocus
                              hideNoData
                              color="amber">
              </v-autocomplete>
            </div>

            <div :class="{ 'col-md-6': reduceSize, 'col-md-12': !reduceSize }">
              <v-slider
                      class="rangeInput"
                      v-model="range"
                      label="Search in range (km)"
                      step="10"
                      min="0"
                      max="500"
                      thumb-label="always"
                      ticks
                      color="amber">
              </v-slider>
            </div>
          </div>
        </div>
        <div class="d-flex justify-center"
             :class="{'col-md-2' : reduceSize, 'col-md-3 align-center' : !reduceSize}">
          <v-btn class="search-btn" color="amber" fab  dark @click="search()">
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
import {ZooSearchForm} from '@/models/ZooSearchForm';
import {City} from '@/models/City';

@Component
export default class Search extends Vue {
    @Prop() public cities: City[] = [];
    @Prop() public reduceSize: boolean = false;
    private city = '';
    private range = 0;

    private created(): void {
        this.$watch('city', _.debounce((value) => {
            if (this.shouldEmit(value)) {
                this.$emit('searchCities', value);
            }
        }, 300));
    }

    private search(): void {
        this.$emit('searchZoo', this.getSearchFormData());
    }

    private getSearchFormData(): ZooSearchForm {
        const city = this.getFullCityObject(this.city);

        return {
            latitude: city.location.latitude,
            longitude: city.location.longitude,
            range: this.range,
        };
    }

    private getFullCityObject(cityFullName: string): City {
        return this.cities.find(city => city.fullName === cityFullName) as City;
    }

    private cityFilter(item: any, queryText: string, itemText: string): boolean {
        return itemText.toLocaleLowerCase().includes(queryText[0].toLocaleLowerCase());
    }

    private shouldEmit(value: string) {
        return value && value !== '' && !value.includes(',');

    }
}
</script>

<style lang="scss" scoped>
  .search-wrapper {
    width: 900px;
    z-index: 999 !important;
    .cityInput{
      padding-top: 0;
    }
    .rangeInput{
      padding-top: 10px;
    }
    .search-btn{
      height: 60px;
      min-width: 60px;
    }

    &.small{
      height: 130px;
      .search-btn{
        height: 50px;
        min-width: 50px;
      }
    }
  }
</style>
