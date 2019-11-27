<template>
  <v-app>

    <Header/>

    <v-content>
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Header from "@/components/Header.vue";

@Component({
    components: {
        Header
    }
})
export default class MainLayout extends Vue {}
</script>

<style scoped>

</style>
