<template>
  <div class="home-wrapper">
    <Search class="search" :reduce-size="reduceSearchSize" @searchCities="searchCities" @searchZoo="searchZoo" :cities="cities" />
    <Map class="map" :show-map="showMap" :zoos="zoos" @selectedZoo="showZoo" />
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import Search from '@/components/Search.vue';
import Map from '@/components/Map.vue';
import {ZooSearchForm} from '@/models/ZooSearchForm';
import {City} from '@/models/City';
import {Zoo} from '@/models/Zoo';

@Component({
    components: {
        Search,
        Map,
    },
})
export default class Home extends Vue {
    private cities: City[] = [];
    private zoos: Zoo[] = [];
    private showMap: boolean = false;
    private reduceSearchSize: boolean = false;

    private searchCities(value: string) {
        this.$store.dispatch('findCities', value);
    }

    private searchZoo(formData: ZooSearchForm) {
        this.$store.dispatch('findNearbyZoos', formData);
    }

    private showZoo(id: number) {
      this.$router.push(`zoo/${id}`);
    }

    private created(): void {
        this.$store.watch(
            (state, getters) => getters.cities,
            (value: City[]) => this.cities = value,
        );

        this.$store.watch(
            (state, getters) => getters.zoos,
            (value: Zoo[]) => this.zoos = value,
        );

        this.$watch('zoos', () => {
            if (this.zoos.length > 0) {
                this.showMap = true;
                this.reduceSearchSize = true;
            }
        });
    }
}
</script>
<style scoped lang="scss">
  .home-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: calc(100vh - 64px);
    .search, .map{
      width: 900px;
    }
    .map{
      height: 400px;
    }
  }
</style>

