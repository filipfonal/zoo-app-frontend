import Vue from 'vue';
import Vuex from 'vuex';
import AuthModule from "@/store/AuthModule";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    AuthModule
  },
});
