const init = function () {
    const _this = this;
    // 建议为了方便使用，这里可以包装window.Alert  具体怎么使用往下看
    window.Alert = function (msg, duration = 3000) {
        // 错误提示
        _this.$notify({
            title: '错误',
            message: msg,
            type: 'error',
            customClass: 'el-error-msg',
            duration
        });
    }
    // 成功提示
    window.Tips = function (msg, duration = 3000) {
        _this.$notify({
            title: '成功',
            message: msg,
            type: 'success',
            duration
        });
    }
    // 警告提示
    window.Warning = function (msg, duration = 3000) {
        _this.$notify({
            title: '警告',
            message: msg,
            type: 'warning',
            duration
        });
    }

    // 全局延时器
    window.SetTimeout = function (path, queryObject) {
        setTimeout(_ => {
            _this.$router.push({
                path: path,
                query: queryObject
            });
        }, 500)
    }
};

export default {
    init
}