/**
 * ajax 模块，可以将 axios 替换成 $.ajax 等
 */
import axios from 'axios';
import globalConfig from '../config'
import { Notification } from 'element-ui'

// 注： 具体设置具体判断 根据公司项目需求 以及 接口需求   现在以我公司为例

const init = function () {
    // 添加 axios 请求拦截器为所有请求加上前缀 、 access_token  （我公司所有接口都比要有 access_token才能访问）
    // 有对 axios 不是很了解的 可以看看 axios 官方文档  https://www.kancloud.cn/yunye/axios/234845
    axios.interceptors.request.use(function (config) {
        // 为所有接口加上前缀 例 https://www.kancloud.cn/yunye/axios/234845 前缀为 https://www.kancloud.cn
        // 因为相同环境下的所有接口前缀肯定是一样的 window.localStorage.gatewayDomain 为前缀域名  倘若后面更改域名之类的  只需改一个地方就行了 就不用说每个调接口的地方都去改  维护便捷
        // 若想了解分环境打包以及分环境设置 公共域名、前缀等  请看以往博文 https://www.cnblogs.com/ljx20180807/p/9456489.html
        config.url = window.localStorage.gatewayDomain + config.url

        // 登录时设置 cookies
        var cookies = globalConfig.getCookies()
        if (config.url.indexOf('?') < 0) {
            config.url += '?'
        }
        // 为所有接口加上 access_token
        config.url += ('access_token=' + cookies['access_token'])
        if (!config.data) config.data = {}
        return config;
    }, function (err) {
        // 错误处理
        return Promise.reject(err)
    })

    // 添加 axios 响应拦截器
    axios.interceptors.response.use(function (response) {

        // 这里是当接口请求服务器成功响应的情况   解构赋值出需要的数据
        const { status, data } = response;

        if (status === 200) {
            // 如果不出现错误，直接向回调函数内输出 data  状态200
            if (data.error === 'SUCCESS') {
                // 成功不用提示
                return data
            } else {
                // 若出现错误则弹窗错误提示
                if (data.message) {
                    Notification({
                        title: '错误',
                        message: data.message,
                        type: 'error',
                        customClass: 'el-error-msg',
                        duration: 2000
                    })
                }
                return data
            }
        } else {
            return response;
        }
    }, function (error) {
        // 这里是当接口请求失败的情况 （例如服务器没响应、后台代码问题之类的）  （具体的响应判断根据你后台返回状态码结构）
        const { response } = error;

        // 这里处理错误的 http code
        if (!response || response.status === 404) {
            if (!response) {  // access_token 失效的情况 弹窗提示
                Notification({
                    title: '错误',
                    message: 'access_token已失效请重新登录',
                    type: 'error',
                    customClass: 'el-error-msg',
                    duration: 1500,
                    onClose() {
                        window.location.href = window.localStorage.loginUrl  // 自动跳转返回登录页重新获取access_token
                    }
                })
            } else {
                // 这是请求url不对的情况
                console.log('404 error %o' + error);
            }
        }
        // Do something with response error 对响应错误做点什么
        return Promise.reject(error.message);
    });
};

export default {
    init
}