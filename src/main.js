import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

import '@/assets/scss/main.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .use(store)
    .mount('#app');
