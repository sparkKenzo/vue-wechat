import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {
    Menu,
    Submenu,
    MenuItem
} from 'element-ui';

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');