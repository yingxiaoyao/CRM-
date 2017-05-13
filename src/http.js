import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex/store'
import router from './router'

// axios 配置
axios.defaults.timeout = 2000;
axios.defaults.baseURL = 'http://lookat.soonergz.com:8888/easycrm';
// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.headers = {"Access-Control-Allow-Headers":"token_id, X-Requested-With, Content-Type"};
// axios.defaults.headers = {"Access-Control-Allow-Headers":"Content-Type"};
// axios.defaults.headers['Content-Type'] = `application/x-www-form-urlencoded`;


// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers['token_id'] = store.state.token
            // config.headers.Authorization = `token ${store.state.token}`; 
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });


// http response 拦截器 
// axios.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:
//                     // 401 清除token信息并跳转到登录页面
//                     store.commit(types.LOGOUT);
//                     router.replace({
//                         path: '',
//                         // query: {redirect: router.currentRoute.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
//                     })
//             }
//         }
//         // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
//         // return Promise.reject(error.response.data)
//     });

export default axios;