import Vue from 'vue';
import Vuex from 'vuex';
import AuthModule from '@/store/AuthModule';
import NotificationModule from '@/store/NotificationModule';
import SearchModule from '@/store/SearchModule';
import ReviewModule from '@/store/ReviewModule';
import FavouritesModule from '@/store/FavouritesModule';
import FriendModule from '@/store/FriendModule';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    AuthModule,
    NotificationModule,
    SearchModule,
    ReviewModule,
    FavouritesModule,
    FriendModule,
  },
});
