<template>
  <v-alert class="alert" v-if="notification" :type="notification.type">
    {{ notification.message }}
  </v-alert>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {Notification} from '@/models/Notification';

@Component
export default class Alert extends Vue {
    @Prop() public notification?: Notification;
}
</script>

<style scoped>
.alert{
  position: absolute;
  right: 20px;
  top: 80px;
}
</style>
