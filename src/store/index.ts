import Vue from 'vue';
import Vuex from 'vuex';
import AuthModule from '@/store/AuthModule';
import NotificationModule from '@/store/NotificationModule';
import SearchModule from '@/store/SearchModule';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    AuthModule,
    NotificationModule,
    SearchModule
  },
});
