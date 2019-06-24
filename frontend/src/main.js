import Vue from 'vue';
import App from './App.vue';
import store from './store';
import Vuetify from 'vuetify';
import VueResource from 'vue-resource';
import 'vuetify/dist/vuetify.min.css';
import {response} from './iterseptors';
import {providersFilter} from "./filters";


Vue.filter('providersFilter', providersFilter);
Vue.use(Vuetify);
Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:4000';
Vue.http.interceptors.push(response);

new Vue({
    store,
    render: h => h(App)
})
    .$mount('#app');
