//防抖函数

function debounce(fn, delay) {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}
//节流函数
function thorw(fn, delay) {
    let flag = true;
    return (...args) => {
        if (!flag) return;
        flag = false;
        setTimeout(() => {
            fn.apply(this, args);
            flag = true;
        }, delay)
    }
}

//手动实现Instanceof 
function instance_of(L, R) {
    let L = L.__proto__;
    let R = R.prototype;
    while (true) {
        if (L === null) return false;
        if (L === R) return true;
        L = L.__proto__
    }
}

//模拟new
function obeject_fac() {
    let obj = new Object();
    let Constru = [].slice.call(arguments).shift();
    obj.__proto__ = Constru;
    let result = Constru.apply(obj, arguments);
    return typeof result === 'object' ? result : obj
}

function obj_creat(target) {
    function F() {};
    F.prototype = target;
    return new F()
}


function 防抖(fn, delay) {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

function 节流(fn, delay) {
    let flag = true;
    return (...args) => {
        if (!flag) return;
        flag = false;
        setTimeout(() => {
            fn.apply(this, args);
            flag = true;
        }, delay)
    }
}

//对象是否为某个构造函数的实例
function inscatnce(L, R) {
    let R = R.prototype;
    let L = L.__proto__;
    while (true) {
        if (L === null) return false;
        if (L === R) return true;
        L = L.__proto__;
    }
} //方法2 ：R.prototype.isPrototypeOf(L)

function private_new() {
    let my_constru = [].slice.call(arguments).shift();
    let obj = new Object();
    obj.__proto__ = my_constru.prototype;
    let result = my_constru.apply(obj, arguments);
    return typeof result === "object" ? result : obj

}


function fangdou(fn, delay) {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

function jieliue(fn, delay) {
    let flag = true;
    return (...args) => {
        if (!flag) return
        flag = false;
        setTimeout(() => {
            fn.apply(this, args);
            flag = true
        }, delay)
    }
}

function owninstanceof(L, R) {
    let L = L.__proto__;
    let R = R.prototype;
    while (true) {
        if (L === null) return false;
        if (L === R) return true;
        L = L.__proto__
    }
}

function fac_obj_create(target) {
    function F() {};
    F.prototype = target;
    return new F()
}

function makanew() {
    let constructer = [].slice.apply(arguments).shift();
    // let obj = new Object();
    let obj = Object.create(constructer.prototype)
    let result = constructer.apply(obj, arguments); //判断构造函数是否有返回值
    return typeof result === 'object' ? result : obj //如果有返回值 则返回构造函数的返回对象 。没有则返回实例
}


//防抖 节流 Instance of  new原理  objectcreate
function fdou(fn, delay) {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this.args)
        }, delay)
    }
}

function jeliu(fn, delay) {
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

function ppinsytance(L, R) {
    let L = L.__proto__;
    let R = R.prototype;
    while (true) {
        if (L === null) return false;
        if (L === R) return true;
        L = L.__proto__;
    }
}

function newyuamli() {
    let structer = [].slice.apply(arguments).shift();
    let obj = new Object();
    obj.__proto__ = structer.prototype
    let result = structer.call(obj, arguments);
    return typeof result === 'object' ? result : obj;
}

function objcretde(target) {
    function F() {};
    F.prototype = target;
    return new F();
}

Function.prototype.mycall = function(_context) {
    let context = _context || window;
    context.fn = this;
    let args = Array.from(arguments).slice(1);
    let ret = context.fn(...args)
    delete context.fn;
    return ret;
}