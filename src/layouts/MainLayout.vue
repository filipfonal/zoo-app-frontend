<template>
  <v-app>

    <Alert :notification="notification"/>

    <Header :isLoggedIn="isLoggedIn" />

    <v-content>
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Alert from '@/components/Alert.vue';

@Component({
    components: {
        Header,
        Alert,
    }
})
export default class MainLayout extends Vue {
    get notification() {
        return this.$store.getters.notification;
    }

    get isLoggedIn() {
        return this.$store.getters.isLoggedIn;
    }
}
</script>

<style scoped>

</style>
