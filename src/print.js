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