// 导入模块
import apiList from './apiList'

const install = function (Vue) {
    if (install.installed) return
    install.installed = true
    Object.defineProperties(Vue.prototype, {
        $api: {
            get () {
                return apiList
            },
            enumerable: false, // 不可枚举
            configurable: false // 不可重写
        }
    })
}

export default {
    install
}