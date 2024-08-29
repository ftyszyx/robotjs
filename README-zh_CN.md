· 中文· [English](./README.md)

# 说明

这个项目是从 robot.js：https://robotjs.io/ fork 过来的。
主要目的如下：

1、使用 node-api 将 c++接口重新封装。
原来的 robot.js c++的封装是使用 v8 api。不同的 node.js 版本兼容 性不好。切换 node.js 版本需要重新编译。
现在使用 node-api，就没有这个问题了。

2、需要解决 typestring 输入过慢的问题
官方的库在 2020 年后基本没有人维护了，我在使用这个库的 0.6 版本时发现，在 typestring 时，每个字符输入都要好久。体验很差。

3、升级依赖的 node-gyp 版本
老的 robot.js 使用的 node-gyp 版本过低，还依赖 python 2.7 这种已经官方不维护的版本，如果电脑上是 python 3 的环境就会编译不了。

4、方便查 bug 和定制，也顺序学习一下 node addon 的知识

# 修改如下：

1. 删除了一些没有用的接口。
2. 去掉了很多测试用例，感觉这些测试用例只是检查接口调用有没有异常，并不能真正的测试接口是否正确，有点鸡肋。后面有可能全部删除。

# 使用

## 安装依赖
`
npm install robotjs_addon
`

## 调用

```
const robot = require("robotjs_addon");

robot.typeString("Hello World");

robot.keyTap("enter");

```

# 支持接口如下
```
export function setKeyboardDelay(ms: number): void

export function setMouseDelay(delay: number): void

export function getScreenSize(): { width: number; height: number }

export function updateScreenMetrics(): void


//keyboard

export function keyTap(key: string, modifier?: string | string[]): void

export function keyToggle(key: string, down: string, modifier?: string | string[]): void

export function typeString(string: string): void

//mouse

export function dragMouse(x: number, y: number): void

export function moveMouse(x: number, y: number): void

export function moveMouseSmooth(x: number, y: number, speed?: number): void

export function mouseClick(button?: MouseButton, double?: boolean): void

export function mouseToggle(down?: boolean, button?: MouseButton): void

export function getMousePos(): { x: number; y: number }

```

## 其它

本库已经为windows/linux/mac预编译了，安装时不需要c++编译环境


# 定制开发说明

## 安装依赖

```
npm install --build-from-source
```

## 打包

```
npm run pack
```

## 发布包

使用了 [node-pre-gyp-github](https://www.npmjs.com/package/node-pre-gyp-github)的代码

这里只是说明一下，已经集成到了github_action
 
### 首先要有github token

go to Settings -> Developer settings

click Personal access tokens

click Generate new token

Select public_repo and repo_deployment

Generate Token

copy the key that's generated and set NODE_PRE_GYP_GITHUB_TOKEN environment variable to it. Within your command prompt:

SET NODE_PRE_GYP_GITHUB_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

设置完环境变量NODE_PRE_GYP_GITHUB_TOKEN后就可以发布了
 
```
npm run release

```

# github_action说明

## build.yml

负责编译各个平台的node module，并上传 github release

## pub_npm.yml

负责打包npm package并上传npm registry

# 遇到的问题记录

## 问题 1:linux 编译时报错

```
../node_modules/node-addon-api/napi-inl.h:2464:34: error: cannot bind non-const lvalue reference of type ‘Napi::CallbackInfo&’ to an rvalue of type ‘Napi::CallbackInfo’
```

原因是

Napi::Object node_getMousePos(Napi::CallbackInfo &info)

的参数要加 const

Napi::Object node_getMousePos(const Napi::CallbackInfo &info)

## 问题 2:

```
./src/mouse.c:12:10: fatal error: X11/extensions/XTest.h: No such file or directory
```

网上说要安装库
```
ubuntu:

$ sudo apt-get install xorg-dev

centeros

$ sudo yum install xorg-x11\*
```


# 参考

[node-addon-api](https://github.com/nodejs/node-addon-api)

[node-gyp-github](https://www.npmjs.com/package/node-pre-gyp-github)

[node-sqlite3](https://github.com/TryGhost/node-sqlite3)

[node-pre-gyp](https://github.com/mapbox/node-pre-gyp)

[robotjs](https://www.npmjs.com/package/robotjs)
