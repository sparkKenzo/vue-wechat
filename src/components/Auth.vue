<template>
    <div>授权登陆中。。。</div>
</template>

<script>
    import axios from '../api/axios';
    import {setOpenId, getToUrl} from '../lib/utils';

    export default {
        name: "Auth",
        created() {
            const ctx = this;
            //获取url上的查询参数code
            const code = this.$route.query.code;
            if (code) {
                //若code存在则调取接口获取用户信息，并跳转路由到之前保存的url;
                axios.post('/wx/userInfo', {
                    code
                }).then(res => {
                    setOpenId(res.data.openid);
                    ctx.$router.push(getToUrl());
                })
            } else {
                //若code不存在则调取接口获取重定向的地址;
                let redirect_url = window.location.href;
                //接口返回包含appId的网页授权url
                axios.post('/auth/url', {
                    url: redirect_url
                }).then(res => {
                    window.location.href = res.data.data;
                })
            }
        }
    }
</script>

<style scoped>

</style>