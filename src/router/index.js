import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import {getOpenId, setToUrl} from '../lib/utils';
import axios from '../api/axios';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.noAuth)) {
        next();
    } else {
        let openid = getOpenId();
        if (openid) {
            next();
        } else {
            if (to.path === '/auth') {
                next();
            } else {
                setToUrl(to.fullPath);
                let redirect_url = "http://kenzo.nat300.top/dist/#/auth/";
                axios.post('/auth/url', {
                    url: redirect_url
                }).then(res => {
                    window.location.href = res.data.data;
                });
            }
        }
    }
});

export default router;