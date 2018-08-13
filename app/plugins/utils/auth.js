const COOKIE_ACCESS_TOKEN = "access_token";
let ACCESS_TOKEN = null;
export default {
  getAccessToken() {
    if (!process.server) {
      let name = COOKIE_ACCESS_TOKEN;
      let arr = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]*)(;|$)")
      );
      if (arr !== null) {
        ACCESS_TOKEN = decodeURIComponent(arr[2]);
      }
    }
    return ACCESS_TOKEN;
  },
  setAccessToken(accessToken, expire) {
    ACCESS_TOKEN = accessToken;
  }
};
