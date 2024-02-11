import Vue from 'vue'
import PopRuntime from './PopRuntime2'

export function deepCopy(target) {
    if (target instanceof PopRuntime) return null
    if (target == window) return null // window 或者globalThis变量不可复制
    if (typeof target == 'object') {
        // try {
        //     // let tmp = JSON.stringify(target)
        //     // eslint-disable-next-line
        //     return Object.assign({},target)
        // } catch (ex) {
        //     console.log('deepCopy-exception:' + ex)
        // }
        const result = Array.isArray(target) ? [] : {}
        for (const key in target) {
            if (typeof target[key] == 'object') {
                result[key] = deepCopy(target[key])
            } else {
                result[key] = target[key]
            }
        }
        return result
    }
    return target
}

export function swap(arr, i, j) {
    const temp = arr[i]
    Vue.set(arr, i, arr[j])
    Vue.set(arr, j, temp)
}

export function $(selector) {
    return document.querySelector(selector)
}

const components = ['VText', 'RectShape', 'CircleShape']
export function isPreventDrop(component) {
    return !components.includes(component) && !component.startsWith('SVG')
}
