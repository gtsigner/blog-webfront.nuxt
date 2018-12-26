import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'access_token';

export function getAccessToken() {
    if (!process.server) {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    } else {
        throw new Error("服务端不能获取Cookie中的token");
    }
}

export function setAccessToken(token) {
    if (!process.server) {
        Cookies.set(ACCESS_TOKEN_KEY, token);
        return localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } else {
        throw new Error("服务端不能获取Cookie中的token");
    }
}

export function removeAccessToken() {
    if (!process.server) {
        Cookies.remove(ACCESS_TOKEN_KEY)
    }
}
