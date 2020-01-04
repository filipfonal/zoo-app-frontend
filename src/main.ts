import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import {store} from '@/store';
// @ts-ignore
import StarRating from 'vue-star-rating';

export const token = () => localStorage.getItem('auth_token');

export const apolloClient = new ApolloClient({
  uri: `${process.env.VUE_APP_BACKEND_URL}/graphql`,
  headers: {
    Authorization: `Bearer ${token()}`,
  },
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.config.productionTip = false;

Vue.use(VueApollo);

Vue.component('star-rating', StarRating);

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
