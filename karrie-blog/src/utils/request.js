import axios from "axios";
import router from "../router";
import store from "../store/index";
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers.Authorization = store.state.user.token;
    return config;
  },
  (error) => {
    // 请求错误时做些事
    // console.log(error);
    return Promise.reject();
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
