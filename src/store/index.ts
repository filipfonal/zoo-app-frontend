import Vue from 'vue';
import Vuex from 'vuex';
import AuthModule from '@/store/AuthModule';
import NotificationModule from '@/store/NotificationModule';
import SearchModule from '@/store/SearchModule';
import ReviewModule from '@/store/ReviewModule';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    AuthModule,
    NotificationModule,
    SearchModule,
    ReviewModule,
  },
});
