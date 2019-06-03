import axios from 'axios';

const ajax = {
    // 获取影像件上传列表
    GET_IMAGE_LIST: 'images?'
};
// 提取公共部分
const API_PATH_PRE_FIX = 'apply/v1/';

// 增加接口模块前缀
let INTERFACE = {};
for (let key in ajax) {
    INTERFACE[key] = API_PATH_PRE_FIX + ajax[key];
}

/**
 * 方式1： 多参数情况  获取列表
 * @param data 参数
 * @returns {*}
 */
function getImageList(data) {
    return axios.get(INTERFACE.GET_IMAGE_LIST, {
        params: data
    }).catch(function (error) {
        window.Alert(error);
    });
}

/**
 * 方式2： es6模板语法  获取基本信息
 * @param data 参数
 * @returns {*}
 */
function getContrantInfo(API_PATH_PRE_FIX, agreementId) {
    return axios.get(`${API_PATH_PRE_FIX}/middle/agreement/basic?agreementId=${agreementId}&`).catch(function (error) {
        window.Alert(error);
    });
}
export default {
    getImageList,
    getContrantInfo,
};