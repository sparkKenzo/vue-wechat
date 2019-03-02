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
            const code = this.$route.query.code;
            if (code) {
                axios.post('/wx/userInfo', {
                    code
                }).then(res => {
                    setOpenId(res.data.openid);
                    ctx.$router.push(getToUrl());
                })
            } else {
                let redirect_url = window.location.href;
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