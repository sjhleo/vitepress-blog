---
title: proxy
---

### Proxy

语法:

`let proxy = new Proxy(target,handler)`

-   target，是需要代理的对象
-   handler， 代理配置，带有钩子的对象，比如 get 钩子用于拦截 target 属性的读取，set 钩子用于拦截 target 属性的写入等。
    如果 handler 为空，则将所有操作转发给 target，跟没有代理表现一样。
    proxy 钩子：
    | 钩子 | 何时触发 |
    | -------- | -------------------------------------------------- |
    | get | 读取属性 |
    | set | 写入属性 |
    | has | in 操作符 |
    | deleteProperty | delete 操作 |
    | apply | proxy 对象作为函数被调用 |
    | construct | proxy 对象作为构造函数，new 操作 |
    | getPrototypeOf | Object.getPrototypeOf |
    | setPrototypeOf | Object.setPrototypeOf |
    | isExtensible | Object.isExtensible |
    | preventExtensions | Object.preventExtensions |
    | defineProperty | Object.defineProperty, Object.defineProperties |
    | getOwnPropertyDescriptor | Object.getOwnPropertyDescriptor, for..in, Object.keys/values/entries |
    | ownKeys | Object.getOwnPropertyNames, Object.getOwnPropertySymbols, for..in, Object/keys/values/entries |

### Reflect

Reflect 是一个内置对象，可简化的创建 Proxy。
| 操作 | Reflect 调用 |
| -------- | -------------------------------------------------- |
| obj[prop] | Reflect.get(obj, prop) |
| obj[prop] = value | Reflect.set(obj, prop, value) |
| delete obj[prop] | Reflect.deleteProperty(obj, prop) |
| new F(value) | Reflect.construct(F, value) |
| ... | ...|

对于每个可被 Proxy 捕获的内部方法，Reflect 都有一个对应的方法 Reflect，其名称和参数与 Proxy 钩子相同

### Proxy 局限性

#### 内置对象：内部插槽（Internal slots）

许多内置对象，例如 Map, Set, Date, Promise 等等都使用了所谓的 “内部插槽”。它们类似于属性，但仅限于内部使用，仅用于规范目的。例如， Map 将项目存储在 [[MapData]]中。内置方法直接访问它们，而不通过 [[Get]]/[[Set]] 内部方法。所以 Proxy 不能拦截。

例如：

```typescript
let map = new Map();
let proxy = new Proxy(map, {});
proxy.set("test", 1); // Error
```

解决办法：

```typescript
let map = new Map();

let proxy = new Proxy(map, {
    get(target, prop, receiver) {
        let value = Reflect.get(...arguments);
        return typeof value == "function" ? value.bind(target) : value;
    }
});

proxy.set("test", 1);
alert(proxy.get("test")); // 1 (works!)
```

#### 私有字段

原因是专用字段是使用内部插槽实现的。问题和解决方法同上

[参考文章](https://juejin.cn/post/6844904090116292616)

### proxy与Object.defineProperty对比

- proxy可以直接监听对象，而不是属性。
- Proxy可以直接监听数组的变化，Object.defineProperty不能监听数组。是通过重写数组的那7个可以改变数组的方法来实现对数组进行监听的。
- proxy有多达13种拦截钩子，apply、ownKeys、has、deleteProperty等是Object.defineProperty无法做到的
- proxy兼容性较差，无法兼容IE9，使用polyfill也不行。