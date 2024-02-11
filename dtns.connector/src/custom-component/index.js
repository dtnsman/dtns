import Vue from 'vue'

const components = [
    'CircleShape',
    'Picture',
    'CAUTH',
    'VText',
    'VButton',
    'Group',
    'RectShape',
    'LineShape',
    'VTable',
    'Upload',
    'CForm',
    'CPop',
]

components.forEach(key => {
    Vue.component(key, () => import(`@/custom-component/${key}/Component`))
    Vue.component(key + 'Attr', () => import(`@/custom-component/${key}/Attr`))
})

const svgs = [
    'SVGStar',
    'SVGTriangle',
]

svgs.forEach(key => {
    Vue.component(key, () => import(`@/custom-component/svgs/${key}/Component`))
    Vue.component(key + 'Attr', () => import(`@/custom-component/svgs/${key}/Attr`))
})
