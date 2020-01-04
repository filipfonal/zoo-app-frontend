<template>
  <div class="search-wrapper">
    <Search class="search" @searchCities="searchCities" @searchZoo="searchZoo" :cities="cities" />
    <Map class="map" :zoos="zoos" />
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import Search from '@/components/Search.vue';
import Map from '@/components/Map.vue';
import {ZooSearchForm} from "@/models/ZooSearchForm";
import {City} from "@/models/City";
import {Zoo} from "@/models/Zoo";

@Component({
    components: {
        Search,
        Map
    },
})
export default class Home extends Vue {
    private cities: City[] = [];
    private zoos: Zoo[] = [];

    private searchCities(value: string) {
        this.$store.dispatch('findCities', value);
    }

    private searchZoo(formData: ZooSearchForm) {
        this.$store.dispatch('findNearbyZoos', formData);
    }

    private created(): void {
        this.$store.watch(
            (state, getters) => getters.cities,
            (value: City[]) => this.cities = value
        );

        this.$store.watch(
            (state, getters) => getters.zoos,
            (value: Zoo[]) => this.zoos = value
        );
    }
}
</script>
<style scoped lang="scss">
  .search-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: calc(100vh - 64px);
    .search{
      width: 900px;
    }
  }
</style>

