let s = new Set();
s.add(1);
s.add(2);
s.add('sd');
s.add(undefined);
s.add({ l: 9 });
s.add(null);
s.add(false)
console.log(s);
let arr = [];
arr.push(1);
arr.push({ a: 9 });
console.log(arr)
    //----数组去重  [...new Set(arr)]
    //----字符串去重 [...new Set(str)].join('')

// size属性 表示元素个数
console.log(s.size);
console.log(s.keys())
let itetor = s.keys();
// Array.from(itetor);
console.log(Array.from(itetor))
console.log([...itetor]); //调用遍历器的时候需要调用遍历器本身而不是指针
console.log([...s.keys()]);
console.log([...s.values()]);
console.log([...s.entries()]);
console.log([...s]);
//set数据结构的作用：去重，实现交集并集
let a = new Set([1, 2, 3]);
let b = new Set([2, 3, 4]);
let union = new Set([...a, ...b]); //并集
let insersect = new Set([...a].filter(x => b.has(x))) //交集
    //WeakSet 元素只能是对象，对象都是弱引用，一旦不使用自动回收，不会引发内存泄漏，因此不能遍历


//Map数据结构 ，允许键名可以是各种类型的数据类型，包括对象
let m = new Map();
let obj = { p: 'hello' };
m.set(obj, 'oooo');
console.log(m.get(obj));
//添加元素  m.set(key,value);
m.set(obj, 'sss');
console.log(m.get(obj));
console.log(m)

//每一个成员都是双元素数组的数据结构都可以作为map的构造函数的参数
//map的键名如果是复杂类型值，则是按内存地址存储的，同名键名如果内存地址不同，仍然是不同的键名
m.set('s', 90);
m.set('s', 99);
console.log(m);
let strr = 'ssss';
let sttt = 'ssss';
m.set(strr, 'lll');
m.set(sttt, 'jjj');
console.log(m.keys());
//WeakMap键名只能是对象，且键名是弱引用，一旦不需要就自动被回收（对垃圾回收友好）。
//WeakMap 没有keys(),values(),entries(),clear()

//模拟call  思想：改变函数的作用域，把函数放在一个对象环境中
//3个步骤：将函数指定为对象的方法，将参数传入对象并执行，删除对象的方法
Function.prototype.mycall = function(_context) {
    let context = _context || window;
    context.fn = this; //将函数指定为对象的方法 this指代mycall函数
    let args = Array.from(arguments).slice(1);
    let ret = context.fn(...args);
    delete context.fn;
    return ret
}
Function.prototype.myapply = function(_context, args) {
    let context = Object(_context) || window;
    context.fn = this;
    let ret = context.fn(...args);
    delete context.fn;
    return ret;
}
let foo = {
    value: 1
};

function bar(name, age) {
    console.log(name, age, this.value)
}

bar.mycall(foo, 'sss', 19);
bar.mycall(foo, 'ttt', 88);

// 模拟bind
Function.prototype.mybind = function(context) {
    let self = this;
    let args = Array.from(arguments).slice(1);
    return (..._args) => { //箭头函数写法
        return self.apply(context, args.concat(_args))
    }

    // return function (){  //非箭头函数写法
    //      let bindargs = Array.from(arguments);
    //     return self.apply(context,args.concat(bindargs))
    // }
};
let bbind = bar.mybind(foo, 'hhh');
bbind(23);

function Dep() {
    this.subs = [1, 2, 3]
};
var dep = new Dep();
console.log(dep)
Dep.target = 1;
console.log(Dep.target)