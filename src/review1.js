function modinew() {
    let constructor = [].slice.call(arguments).shift();
    let obj = new Object();
    obj.__proto__ = constructor.prototype;
    let ret = constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
}

function makefangdou(fn, delay) {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay)
    }
}

function makejielliu(fn, delay) {
    let flag = true;
    return (...args) => {
        if (!flag) return false;
        flag = false
        setTimeout(() => {
            fn.apply(this, args);
            flag = true
        }, delay)
    }
}

function makeinsytance(L, R) {
    L = L.__proto__;
    R = R.prototype;
    while (true) {
        if (L === null) return false;
        if (L === R) return true;
        L = L.__proto__;
    }
}

function createobj(target) {
    function F() {};
    F.prototype = target;
    return new F()
}