// const { Promise, resolve } = require("bluebird")


function callback() {
    console.log('its me')
}
// const { Promise } = require("bluebird")
// 实现sleep函数的几种方法
// 1.直接settimeout实现
// function settiemoutsleep(callback, ms) {
//     setTimeout(callback, ms)
// }
// settiemoutsleep(callback, 2000)
// 2.使用promise实现
// let mypromise = ms => {
//     return new Promise(resolve => {
//         setTimeout(resolve, ms);
//     })
// }
// mypromise(1000).then(callback)
// 3.使用async await实现
async function runsleep() {
    console.log(1);
    await slle_p(2000)
    callback()
    console.log(2)
};

function slle_p(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}
runsleep();


// let mypromise = value => {
//     return new Promise(resolve => {
//         // setTimeout(resolve, value, 'donnn')
//         resolve(555 + value) //由resolve携带参数返回给回调函数
//     })
// }
// mypromise(2000).then((value) => {
//     console.log(222, value)
// })

// const sleep = time => {
//  return new Promise(resolve => setTimeout(resolve,time)
//  ) } 
//  sleep(1000).then(()=>{ console.log(1) })
// function mysleep(ms) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, ms)
//     })
// };

// async function runsleep() {
//     console.log(111);
//     await mysleep(2000);
//     console.log(222);
// }

// promise 实现ajax
let getjson = url => {
    let promise = new Promise((resolve, reject) => {
        let handler = function() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        };
        let client = new XMLHttpRequest();
        client.open('GET', url);
        client.onreadystatechange = handler;
        client.responseType = 'json';
        client.setRequestHeader('Accept', 'application/json');
        client.send();
    });
    return promise;
};
getjson('/post.json').then(json =>
    console.log('content is ' + json), error =>
    console.log('error is', error)
)