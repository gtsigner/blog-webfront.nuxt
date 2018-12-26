import { logger } from "../service/logger";
import * as types from '../store/mutation-types';
import { getStoreHost } from "../service/url";


export default function ({ $axios, redirect, store, req }) {


    $axios.onRequest((config) => {
        // $axios.setHeader('StoreDomain', 's1.local.me');
        // $axios.setToken('123', 'Bearer');
        const code = (store.state.store && store.state.store.id) || '';
        config.timeout = 5000;
        config.headers['Store-Host'] = getStoreHost(req);
        config.headers['Store-Token'] = code;
        config.headers['Store-App-Id'] = code;
        if (store.state.accessToken) {
            config.headers['Authorization'] = 'Bearer ' + store.state.accessToken;
        }
        return config;
    });

    $axios.onResponse((res) => {
        const message = (res.data && res.data.message) || '请求成功';
        const code = (res.data && res.data.code) || 1001;
        return { data: res.data, message: message, status: 200, ok: true, code: code };
    });

    $axios.onResponseError(error => {
        const code = parseInt(error.response && error.response.status);
        const message = (error.response && error.response.data && error.response.data.message) || 'Api请求失败';
        logger.error("Api:", error.response && error.response.data, error.message, message, error.request._currentUrl);
        switch (code) {
            case 500:
                break;
            case 401:
                //还没有进行登录
                store.commit(types.SET_AUTH_FORM, { show: true });
                break;
            case 400:
                //错误
                break;
            default:
                break;
        }
        return { message: message, ok: false, status: code };
    });
}
