---
title: 异步循环
---

### 异步循环

准备面试的时候看到一道笔试题：

`输出以下代码运行结果，为什么？如果希望每隔 1s 输出一个结果，应该如何改造？注意不可改动 square 方法`

```javascript
const list = [1, 2, 3];
const square = (num) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num * num);
        }, 1000);
    });
};

function test() {
    list.forEach(async (x) => {
        const res = await square(x);
        console.log(res);
    });
}
test();
```

forEach 的 polyfill 参考：MDN-Array.prototype.forEach()

```javascript
Array.prototype.forEach = function (callback) {
    for (let index = 0; index < this.length; index++) {
        callback(this[index], index, this);
    }
};
```

运行结果: 结果比较容易看出来，forEach 函数内部是异步的,不能阻塞，所以题目中三个 timeout 几乎是同时加入到宏任务队列，**_同时输出 1,4,9_**

这里主要考察的是如何实现异步循环，最简单的改造方法是直接把 foreach 循环改成 for in 或者 for of 循环，简单直接。

```javascript
function test() {
    for(let i = 0; i < list.length; i++) {
        let res = await square(list[i]);
        console.log(res);
    }
}
```

但是自己刚开始看到这道题思路没有想到这里，想用 Promise 的链式进行处理，通过 forEach 将我们需要按顺序执行的回调组装成一个操作链，这样的话 list 的遍历函数无论是用 foreach 还是 for in、for of 都是一样的结果，我们通过**遍历 list 组装了一个异步回调链**，配合 square 函数定时 1s 执行 resolve 就能实现间隔 1s 执行一步回调，输出一个结果，直接上代码:

```javascript
function test() {
    var p = Promise.resolve();
    list.forEach((x) => {
        p = p.then(() => square(x).then((res) => console.log(res)));
    });
    // p = Promise.resolve().then(() => square(1).then((res) => console.log(res))).then(() => square(2).then((res) => console.log(res))).then(() => square(3).then((res) => console.log(res)))
}
```

看到这道题目的时候自己虽然想到 Promise 的这个解决思路，但是这个链式的组装硬是调试了很久才完全搞定，对 Promise 的掌握还不够熟练。

关于这道题的更多讨论 [可以看这里](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/389)
