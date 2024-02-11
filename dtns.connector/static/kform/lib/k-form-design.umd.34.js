((typeof self !== 'undefined' ? self : this)["webpackJsonpk_form_design"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpk_form_design"] || []).push([[34],{

/***/ "d95a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5d16e32a-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/components/KImage/KImage.vue?vue&type=template&id=c1e0c238&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    style: {
      textAlign: _vm.record.options.textAlign,
      transform: 'translateY(-2px)',
      paddingRight: '8px'
    }
  }, [_c('img', {
    class: {
      'ant-form-item-required': _vm.record.options.showRequiredMark
    },
    attrs: {
      "src": _vm.imgSrc,
      "width": "100%"
    }
  })]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./packages/components/KImage/KImage.vue?vue&type=template&id=c1e0c238&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.promise.js
var es6_promise = __webpack_require__("551c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.starts-with.js
var es6_string_starts_with = __webpack_require__("f559");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/components/KImage/KImage.vue?vue&type=script&lang=js&




/* harmony default export */ var KImagevue_type_script_lang_js_ = ({
  name: "KImage",
  props: ["record", "value"],
  data: function data() {
    return {
      imgSrc: ""
    };
  },
  mounted: function () {
    var _mounted = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            this.setValue();
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function mounted() {
      return _mounted.apply(this, arguments);
    }
    return mounted;
  }(),
  watch: {
    value: {
      // value 需要深度监听及默认先执行handler函数
      handler: function handler(val) {
        if (val) {
          this.setValue();
        }
      }
    }
  },
  methods: {
    setValue: function () {
      var _setValue = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var This, item, params;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              This = this;
              if (!(this.value && this.value.startsWith('data:image/'))) {
                _context2.next = 4;
                break;
              }
              This.imgSrc = this.value;
              return _context2.abrupt("return");
            case 4:
              _context2.next = 6;
              return window.imageDb.getDataByKey(this.value);
            case 6:
              item = _context2.sent;
              //localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
              if (item) this.imgSrc = item.data;else {
                params = {
                  user_id: localStorage.user_id,
                  s_id: localStorage.s_id,
                  filename: this.value,
                  img_kind: 'open',
                  img_p: 'min200'
                };
                new Promise(function (resolve, reject) {
                  if (!params || !params.filename) return resolve({
                    ret: false,
                    msg: 'param(filename) is null'
                  });
                  window.rpc_client.send('/image/view', params, null, function (rdata) {
                    console.log('rdata:' + JSON.stringify(rdata));
                    resolve(rdata.data);
                  });
                  setTimeout(function () {
                    return reject(null);
                  }, 30000);
                }).then(function (data) {
                  This.imgSrc = 'data:image/png;base64,' + data.data;
                  window.imageDb.addData({
                    img_id: This.value,
                    data: This.imgSrc
                  });
                }).catch(function (ex) {
                  console.log('load img error', ex);
                });
              }
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function setValue() {
        return _setValue.apply(this, arguments);
      }
      return setValue;
    }()
  }
});
// CONCATENATED MODULE: ./packages/components/KImage/KImage.vue?vue&type=script&lang=js&
 /* harmony default export */ var KImage_KImagevue_type_script_lang_js_ = (KImagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./packages/components/KImage/KImage.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  KImage_KImagevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var KImage = (component.exports);
// CONCATENATED MODULE: ./packages/components/KImage/index.js

/* harmony default export */ var components_KImage = __webpack_exports__["default"] = (KImage);

/***/ })

}]);