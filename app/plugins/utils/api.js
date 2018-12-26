import axios from "axios";
import Auth from "./auth";

let accessToken = "";
const configs = {
    uri: process.env.API_BASE
};
const instance = axios.create({
    baseURL: process.env.API_BASE,
    timeout: 1500,
    headers: {},
    withCredentials: true
});

//加入Token在Request拦截器中
instance.interceptors.request.use(
    config => {
        const accessToken = Auth.getAccessToken();
        config.headers["Authorization"] = "Bearer " + accessToken;
        config.headers["access-token"] = accessToken;
        return config;
    },
    error => {
        throw error;
    }
);

// http response 拦截器
instance.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        if (!error.response) {
            //处理错误信息
            return { code: Codes.SERVER_ERROR, message: "服务器错误" };
        }

        return error.response.data; // 返回接口返回的错误信息
    }
);

export const Codes = {
    SUCCESS: 1001, //成功
    FAIL: 1004, //失败
    NOT_FOUND: 1404, //未找到
    SERVER_ERROR: 1005, //服务器错误
    NOT_AUTH: 1041 //未授权
};
export const http = instance;

const ApiPlugin = () => {
};
ApiPlugin.install = (Vue, options) => {
    Vue.prototype.$api = {
        http: instance,
        codes: Codes
    };
};
export const Api = ApiPlugin;

//上传文件
export const Axios = axios;
export const Upload = axios.create({
    baseURL: configs.uri,
    timeout: 1500,
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true
});
