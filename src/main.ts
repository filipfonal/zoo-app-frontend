import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: `${process.env.VUE_APP_BACKEND_URL}/graphql`,
  }),
});

Vue.config.productionTip = false;

Vue.use(VueApollo);

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
