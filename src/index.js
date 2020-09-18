import './index.css';
import './print' //多入口

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