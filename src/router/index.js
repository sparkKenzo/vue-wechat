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
    //判断路由是否需要验证登陆
    if (to.matched.some(record => record.meta.noAuth)) {
        next();
    } else {
        //从本地存储中获取用户信息（比如这里的openid）,若存在store中，刷新页面则没有了，需要重新授权;
        let openid = getOpenId();
        if (openid) {
            next();
        } else {
            if (to.path === '/auth') {
                next();
            } else {
                //保存当前准备跳转的url
                setToUrl(to.fullPath);
                //查询接口获取带appId的完整网页授权接口url,并跳转到该url(如果直接next("/auth")则会有两次路由跳转);
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