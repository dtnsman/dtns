((typeof self !== 'undefined' ? self : this)["webpackJsonpk_form_design"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpk_form_design"] || []).push([[36],{

/***/ "fa66":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5d16e32a-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/components/KText/KText.vue?vue&type=template&id=04896193&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "ktext_line",
    style: {
      textAlign: _vm.record.options.textAlign,
      transform: 'translateY(-2px)',
      paddingRight: '8px'
    }
  }, [_c('label', {
    class: {
      'ant-form-item-required': _vm.record.options.showRequiredMark
    },
    style: {
      fontFamily: _vm.record.options.fontFamily,
      fontSize: _vm.record.options.fontSize,
      color: _vm.record.options.color
    },
    domProps: {
      "textContent": _vm._s(_vm.value)
    }
  })]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./packages/components/KText/KText.vue?vue&type=template&id=04896193&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/components/KText/KText.vue?vue&type=script&lang=js&
/* harmony default export */ var KTextvue_type_script_lang_js_ = ({
  name: "KText",
  props: ["record", "value"]
  // data() {
  //     return {
  //       textVal:"",
  //     };
  //   },
  //   async mounted() {
  //      this.setValue()
  //   },
  //   watch: {
  //     value: {
  //       // value 需要深度监听及默认先执行handler函数
  //       handler(val) {
  //         if (val) {
  //           this.setValue();
  //         }
  //       }
  //     }
  //   },
  //   methods: {
  //     async setValue() {
  //       this.textVal = this.value
  //     },
  //   }
});
// CONCATENATED MODULE: ./packages/components/KText/KText.vue?vue&type=script&lang=js&
 /* harmony default export */ var KText_KTextvue_type_script_lang_js_ = (KTextvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./packages/components/KText/KText.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  KText_KTextvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var KText = (component.exports);
// CONCATENATED MODULE: ./packages/components/KText/index.js

/* harmony default export */ var components_KText = __webpack_exports__["default"] = (KText);

/***/ })

}]);