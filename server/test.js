// const fs = require('fs');
// const util = require('util');
// import fs from 'fs';
// import util from 'util'
require('babel-core/register')()
require('babel-polyfill')

// 使用promise
// util.promisify(fs.readFile)('./package.json')
//     .then(JSON.parse)
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err=>{
//         console.log(err);
//     })

// 使用async
// const readAsync = util.promisify(fs.readFile);

// async function init () {
//     try {
//         let data = await readAsync('./package.json');
//         data = JSON.parse(data);
//         console.log(data);
//     } catch (err) {
//         console.log(err);
//     }
// }

// init();

// 在package.json下scripts内输入set NODE_ENV=development可以设置当前node环境
let env = process.env.NODE_ENV;
console.log(env);

// 使用迭代器 生成器
// function *iterator (arr) {
//     for(let i=0,len=arr.length; i<len; i++) {
//         yield arr[i];
//     }
// }

// let gen = iterator(["a",'b','c']);
// console.log(gen.next());

// 异步获取数据 node-fetch模块

// request-promise-native 通过promise的方式来使用request的库， 需要先安装request
// const isArray = (obj)=> Array.isArray(obj) ? obj : [obj]
// // 装饰器
// // @speak


// const d = (args, mid) => {
//     let [ target, key, descriptor ] = args;
//     // target[key] = isArray(target[key])
//     // target[key].unshift(mid)
//     mid()
//     // console.log('迭代？', target[key])
//     return descriptor
// }

// const c = mid => (...args) => d(args,mid)

// const s1 = a => c(async () => {
//     console.log('中间件1？'+a)
//     // await next()
// })

// const s2 = a => c(async () => {
//     console.log('中间件2？'+a)
//     // await next()
// })

// class Boy {
//     @s1(1)
//     @s2(2)
//     run () {
//         console.log(11111)
//     }

// }

// // 在new的时候会执行装饰器
// const xu = new Boy();

