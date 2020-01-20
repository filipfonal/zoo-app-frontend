<template>
  <div class="user-wrapper">
    <div class="user-header">
      <v-avatar class="user-logo" color="white" size="100">
        <v-img src="@/assets/avatar.png"></v-img>
      </v-avatar>
      <div class="user-name">
        <h1>{{ user.name }}</h1>
        <h3 v-if="authData && user.id === authData.id">Your profile</h3>
      </div>
      <div class="user-buttons-bar" v-if="authData && user.id !== authData.id">
        <v-btn class="mx-2" fab dark x-small color="#32bda6">
          <v-icon dark>mdi-account-plus</v-icon>
        </v-btn>
      </div>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    import {User} from '@/models/User';

    @Component
    export default class UserHeader extends Vue {
        @Prop() public user?: User;
        @Prop() public authData?: object;

    }
</script>

<style lang="scss" scoped>
  .user-wrapper {
    position: relative;
    background-color: #4c442b;
    margin-bottom: 100px;

    &:after {
      content: "";
      background: #ffc107;
      background-position-y: 25%;
      background-size: cover;
      opacity: 0.5;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
    }

    .user-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2em 4em;
      position: relative;

      .user-logo {
        z-index: 1;
      }

      .user-name {
        color: #fff;
        text-shadow: 3px 2px 3px rgba(255, 255, 255, .2), 2px 1px 10px #000000;
        position: absolute;
        top: 60px;
        left: 200px;
        z-index: 1;

        h1 {
          margin: 0;
        }
      }

      .user-buttons-bar {
        z-index: 1;
        position: relative;
        display: flex;
      }
    }
  }
</style>
