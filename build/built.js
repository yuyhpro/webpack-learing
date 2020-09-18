/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/index.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/index.css ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _liyunl_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./liyunl.png */ "./src/liyunl.png");
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()(_liyunl_png__WEBPACK_IMPORTED_MODULE_2__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "#box1 {\r\n    width: 100px;\r\n    height: 100px;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n    background-repeat: no-repeat;\r\n    background-size: 100% 100%;\r\n}\r\n\r\n#box2 {\r\n    width: 100px;\r\n    height: 100px;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n    background-repeat: no-repeat;\r\n    background-size: 100% 100%;\r\n}\r\n\r\n#box3 {\r\n    width: 100px;\r\n    height: 100px;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n    background-repeat: no-repeat;\r\n    background-size: 100% 100%;\r\n}", "",{"version":3,"sources":["index.css"],"names":[],"mappings":"AAAA;IACI,YAAY;IACZ,aAAa;IACb,yDAAmC;IACnC,4BAA4B;IAC5B,0BAA0B;AAC9B;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,yDAAmC;IACnC,4BAA4B;IAC5B,0BAA0B;AAC9B;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,yDAAmC;IACnC,4BAA4B;IAC5B,0BAA0B;AAC9B","file":"index.css","sourcesContent":["#box1 {\r\n    width: 100px;\r\n    height: 100px;\r\n    background-image: url(./liyunl.png);\r\n    background-repeat: no-repeat;\r\n    background-size: 100% 100%;\r\n}\r\n\r\n#box2 {\r\n    width: 100px;\r\n    height: 100px;\r\n    background-image: url(./liyunl.png);\r\n    background-repeat: no-repeat;\r\n    background-size: 100% 100%;\r\n}\r\n\r\n#box3 {\r\n    width: 100px;\r\n    height: 100px;\r\n    background-image: url(./liyunl.png);\r\n    background-repeat: no-repeat;\r\n    background-size: 100% 100%;\r\n}"]}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/index.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _print__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./print */ "./src/print.js");
/* harmony import */ var _print__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_print__WEBPACK_IMPORTED_MODULE_1__);

 //多入口

// 注册serviceworker ，处理兼容性问题
if ('serviceworker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(() => {
            console.log('success loaded')
        }).catch(() => {
            console.log('failed loaded')
        })
    })
}

// console.log('udsdc222u');
// console.log('update')
// console.log('update')
// console.log(1 + 10)

function sum(...args) {
    return args.reduce((p, c) => p + c, 0);
}
// console.log(sum(1, 2, 3, 4))

/***/ }),

/***/ "./src/liyunl.png":
/*!************************!*\
  !*** ./src/liyunl.png ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "e7f313dcad.png");

/***/ }),

/***/ "./src/print.js":
/*!**********************!*\
  !*** ./src/print.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

// const { fuchsia } = require("color-name");
// const { isPrimitive, isArray } = require("util");
// const CipherBase = require("cipher-base");
// const set = require("set-value");

//2020-9-02
function debounce(fn, delay) { //防抖函数
    let timer = null;
    return (...args) => { //args表示debounce多余的参数
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay);
    };
};

function fn(a, b) {
    console.log(a + b)
};
debounce(fn, 2000)(9, 9) //输出18

//防抖函数的原理：用一个定时器去执行一个函数，如果在定时器延迟时间内再次触发，则重新计时。
//防抖函数使用场景：防止多次提交

//节流函数  在一段时间内只能执行一次
function throttle(fn, delay) {
    let flag = true;
    return (...args) => {
        if (!flag) return;
        flag = false;
        setTimeout(() => {
            fn.apply(this, args);
            flag = true
        }, delay);
    }
}

function boundece(fn, delay) {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    };
}

function throttle(fn, delay) {
    let flag = true;
    return (...args) => {
        if (!flag) return;
        flag = false;
        setTimeout(() => {
            fn.apply(this, args);
            flag = true
        }, delay)
    }
}



//深克隆 
//自动版  
// const newobj = JSON.parse(JSON.stringify(oldobj));
//实现深拷贝

//instanceof 实现
function instance_of(L, R) {
    var O = R.prototype;
    L = L.__proto__;
    while (true) {
        if (L == null) return false;
        if (L === O) return true;
        L = L.__proto__;
    }
}

//模拟new
// new原理
// 创建一个空对象，作为将要返回的对象实例。
// 将这个空对象的原型，指向构造函数的prototype属性。
// 将这个空对象赋值给函数内部的this关键字。
// 开始执行构造函数内部的代码
function objectFactory() {
    let obj = new Object();
    let conStructor = [].slice.call(arguments).shift();
    obj.__proto__ = conStructor.prototype;
    let result = conStructor.apply(obj, arguments);
    return typeof result === "object" ? result : obj
}

//实现call，apply,bind 
Function.prototype.mycall = function(context) {
    context.fn = this;
    let args = [];
    for (let i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    context.fn(...args);

}

//实现object.create
//原理：新建一个空的构造函数，让构造函数的原型指向参数对象
function mycreat(target) {
    function F() {};
    F.prototype = target;
    return new F()
}

//实现promise


console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0);
Promise.resolve().then(function() {
    console.log('promise1');
}).then(function() {
    console.log('promise2');
});
console.log('script end');


//对异步 宏任务，微任务的理解
//微任务总是先于宏任务执行,
//promise ,process.nextTick是微任务
//settimeout 是宏任务
//事件循环机制是怎样的
//执行栈在执行完同步任务后，检查微任务列队，开始执行微任务，执行完就执行宏任务，如此循环。
console.log('script start') //1
async function async1() {
    await async2()
    console.log('async1 end') //2
}
async function async2() {
    console.log('async2 end') //1
}
async1()
setTimeout(function() {
    console.log('setTimeout') //3
}, 0)
new Promise(resolve => {
        console.log('Promise') //1
        resolve()
    })
    .then(function() {
        console.log('promise1') //2
    })
    .then(function() {
        console.log('promise2') //2
    })
console.log('script end') //1

//运用object.assgin() 实现浅拷贝

//如何实现深拷贝 
//第三方库 immutabel.js
//手动实现 ???


//js 内存机制
//基本数据类型保存在栈，复杂数据类型保存在堆
//当一个基本数据类型被闭包引用了 它就会一直存在于堆内存中
// ??垃圾回收机制是什么

//eevent bus 怎么实现？

//js 运行机制考察：作用域的本质是什么，this是如何绑定的,闭包产生的根本原因

//vue双向绑定原理
//监听 Object.defineProperty.set方法，触发视图更新

let data = {
    a: 9,
    b: 10,
    c: { 'qwe': 99, 'sd': 999 }
}

function defineReactive(data, key, value) {
    //递归调用  监听所有属性
    observer(value);
    var dep = new Dep();
    Object.defineProperty(data, key, {
        get: function() {
            if (dep.target) {
                dep.addSub(dep.target)
            }
            return value
        },
        set: function(newVal) {
            if (value !== newVal) {
                value = newVal;
                dep.notify()
            }
        }
    })
}

function observer(data) {
    if (!data || typeof data !== 'object') {
        return
    }
    Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key])
    })
}

function Dep() {
    this.subs = [];
}
Dep.prototype.addSub = function(sub) {
    this.subs.push(sub)
}
Dep.prototype.notify = function() {
    console.log('监听到属性变化，通知watcher执行视图更新');
    this.subs.forEach(sub => {
        console.log('执行 update')
    })
}
Dep.target = null;

function Watcher(vm, prop, callback) {
    this.vm = vm;
    this.prop = prop;
    this.callback = callback;
    this.value = this.get();
}
Watcher.prototype = {
    update: function() {
        const value = this.vm.$data[this.prop];
        const oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.callback(value);
        }
    },
    get: function() {
        Dep.target = this;
        const value = this.vm.$data[this.prop];
        Dep.target = null;
        return value;

    }
}


//虚拟dom 原理
function vnode(type, key, data, children, text, elm) {
    const element = {
        _type: VNODE_TYPE,
        type,
        key,
        data,
        children,
        text,
        elm
    }
    return element
}

function h(type, config, ...children) {
    const props = {};
    let key = null;
    if (config != null) {
        if (hasValidKey(config)) {
            key = '' + config.key
        }
        for (let propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS[propName]) {
                props[propName] = config[propName]
            }
        }
    }
    return vnode(
        type,
        key,
        props,
        flattenArray(children).map(c => {
            return isPrimitive(c) ? vnode(undefined, undefined, undefined, undefined, c) : c
        })
    )
}

function createElm(vnode, insertedVnodeQueue) {
    let data = vnode.data;
    let i;
    let children = vnode.children;
    let type = vnode.type;
    if (DocumentTypepe === 'comments') {
        if (vnode.text == null) {
            vnode.text = ''
        }
        vnode.elm = api.createComment(vnode.text)
    } else if (type) {
        const elm = vnode.elm = data.ns ? api.createElementNS(data.ns, type) : api.createElement(type)
        for (let i = 0; i < CipherBase.create.length; ++i) cbs.create[i](emptyNode, vnode)
        if (isArray(children)) {
            children.forEach(ch => {
                ch && api.appendChild(elm, createElm(ch, insertedVnodeQueue))
            })
        }
    }
}

//set数据结构

let s = new Set();
s.add(1);
console.log(s);

/***/ })

/******/ });
//# sourceMappingURL=built.js.map