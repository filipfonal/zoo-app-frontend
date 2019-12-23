<template>
  <v-app>

    <Alert :notification="notification"/>

    <Header/>

    <v-content>
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Alert from '@/components/Alert.vue';
import {Notification} from '@/models/Notification';

@Component({
    components: {
        Header,
        Alert,
    },
})
export default class MainLayout extends Vue {
    private notification: Notification = this.$store.getters.notification;
}
</script>

<style scoped>

</style>
