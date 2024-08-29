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

安装依赖

···
npm install --build-from-source
···

打包

···
npm pack
···

# 发布包

首先要有 npm 账号
https://www.npmjs.com/ 注册账号

npm adduser 此时要关掉代理
npm 会跳转 npm 官网登陆

上传 github

配置环境变量

NODE_PRE_GYP_GITHUB_TOKEN

Within GitHub, create a new authorization:

go to Settings -> Developer settings
click Personal access tokens
click Generate new token
Select public_repo and repo_deployment
Generate Token
copy the key that's generated and set NODE_PRE_GYP_GITHUB_TOKEN environment variable to it. Within your command prompt:
SET NODE_PRE_GYP_GITHUB_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

```
npm publish

```

# node addon

https://github.com/nodejs/node-addon-api

# 遇到的问题记录

问题 1:linux 编译时报错

···
../node_modules/node-addon-api/napi-inl.h:2464:34: error: cannot bind non-const lvalue reference of type ‘Napi::CallbackInfo&’ to an rvalue of type ‘Napi::CallbackInfo’
···

原因是
Napi::Object node_getMousePos(Napi::CallbackInfo &info)
的参数要加 const
Napi::Object node_getMousePos(const Napi::CallbackInfo &info)

问题 2:

```
./src/mouse.c:12:10: fatal error: X11/extensions/XTest.h: No such file or directory
```

网上说要安装库

sudo apt-get install libx11-dev
