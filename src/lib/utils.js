export function setToUrl(url){
    sessionStorage.setItem("beforeUrl",url);
}
export function getToUrl(){
    return sessionStorage.getItem("beforeUrl");
}
export function setOpenId(openid) {
    sessionStorage.setItem("wxopenid",openid);
}
export function getOpenId() {
    return sessionStorage.getItem("wxopenid");
}