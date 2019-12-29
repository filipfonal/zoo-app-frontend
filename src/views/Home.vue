<template>
  <div class="search-wrapper">
    <Search class="search" @searchCity="test" />
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import Search from '@/components/Search.vue';

@Component({
    components: {
        Search,
    },
})
export default class Home extends Vue {
    test(value: string) {
        console.log(value);
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

