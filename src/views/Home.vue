<template>
  <div class="search-wrapper">
    <Search class="search" @searchCities="searchCities" @searchZoo="searchZoo" :cities="cities" />
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import Search from '@/components/Search.vue';
import {ZooSearchForm} from "@/models/ZooSearchForm";
import {City} from "@/models/City";
import {Zoo} from "@/models/Zoo";

@Component({
    components: {
        Search,
    },
})
export default class Home extends Vue {
    private cities: City[] = this.$store.getters.cities;
    private zoos: Zoo[] = this.$store.getters.zoos;

    private searchCities(value: string) {
        this.$store.dispatch('findCities', value);
    }

    private searchZoo(formData: ZooSearchForm) {
        this.$store.dispatch('findNearbyZoos', formData);
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

