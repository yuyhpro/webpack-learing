// var data = { name: 'kindeng' };
// observe(data);
// data.name = 'dmq'; // 哈哈哈，监听到值变化了 kindeng --> dmq

// function observe(data) {
//     if (!data || typeof data !== 'object') {
//         return;
//     }
//     // 取出所有属性遍历
//     Object.keys(data).forEach(function(key) {
//         defineReactive(data, key, data[key]);
//     });
// };

// function defineReactive(data, key, val) {
//     var dep = new Dep();
//     observe(val); // 监听子属性
//     Object.defineProperty(data, key, {
//         enumerable: true, // 可枚举
//         configurable: false, // 不能再define
//         get: function() {
//             Dep.target && dep.addSub(Dep.target)
//             return val;
//         },
//         set: function(newVal) {
//             console.log('哈哈哈，监听到值变化了 ', val, ' --> ', newVal);
//             val = newVal;
//             dep.notify();
//         }
//     });
// }

// function Dep() { //  
//     this.subs = [];
// }
// Dep.prototype = {
//     addSub: function(sub) {
//         this.subs.push(sub);
//     },
//     notify: function() {
//         this.subs.forEach(function(sub) {
//             sub.update();
//         });
//     }
// }

// function Watcher(vm, exp, cb) {
//     this.cb = cb;
//     this.vm = vm;
//     this.exp = exp;
//     this.value = this.get();
// }
// Watcher.prototype = {
//     update: function() {
//         this.run();
//     },
//     run: function() {
//         var value = this.get();
//         var oldvalue = this.value;
//         if (value !== oldvalue) {
//             this.value = value;
//             this.cb.call(this.vm, value, oldvalue)
//         }
//     },
//     get: function(key) {
//         Dep.target = this;
//         this.value = data[key];
//         Dep.target = null;
//     }
// }

// 监听者,监听对象属性值的变化
class Observer {
    constructor(value) {
            this.value = value;
            this.walk(value);
        }
        // 遍历属性值并监听
    walk(value) {
            Object.keys(value).forEach(key => this.convert(key, value[key]));
        }
        // 执行监听的具体方法
    convert(key, val) {
        defineReactive(this.value, key, val);
    }
}

function defineReactive(obj, key, val) {
    const dep = new Dep();
    // 给当前属性的值添加监听
    let chlidOb = observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            // 如果Dep类存在target属性，将其添加到dep实例的subs数组中
            // target指向一个Watcher实例，每个Watcher都是一个订阅者
            // Watcher实例在实例化过程中，会读取data中的某个属性，从而触发当前get方法
            if (Dep.target) {
                dep.depend();
            }
            return val;
        },
        set: newVal => {
            if (val === newVal) return;
            val = newVal;
            // 对新值进行监听
            chlidOb = observe(newVal);
            // 通知所有订阅者，数值被改变了
            dep.notify();
        },
    });
}

function observe(value) {
    // 当值不存在，或者不是复杂数据类型时，不再需要继续深入监听
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
}
class Watcher {
    constructor(vm, expOrFn, cb) {
            this.depIds = {}; // hash储存订阅者的id,避免重复的订阅者
            this.vm = vm; // 被订阅的数据一定来自于当前Vue实例
            this.cb = cb; // 当数据更新时想要做的事情
            this.expOrFn = expOrFn; // 被订阅的数据
            this.val = this.get(); // 维护更新之前的数据
        }
        // 对外暴露的接口，用于在订阅的数据被更新时，由订阅者管理员(Dep)调用
    update() {
        this.run();
    }
    addDep(dep) {
        // 如果在depIds的hash中没有当前的id,可以判断是新Watcher,因此可以添加到dep的数组中储存
        // 此判断是避免同id的Watcher被多次储存
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    }
    run() {
        const val = this.get();
        console.log(val);
        if (val !== this.val) {
            this.val = val;
            this.cb.call(this.vm, val);
        }
    }
    get() {
        // 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
        Dep.target = this;
        const val = this.vm._data[this.expOrFn];
        // 置空，用于下一个Watcher使用
        Dep.target = null;
        return val;
    }
}