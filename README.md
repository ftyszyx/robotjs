· English · [中文](./README-zh_CN.md)

# illustrate

This project is forked from robot.js: https://robotjs.io/.
The main purposes are as follows:

1. Use node-api to re-encapsulate the c++ interface.
   The original robot.js c++ package uses v8 api. Different node.js versions are not compatible. Switching node.js versions requires recompiling.
   Now using node-api, there is no such problem.

2. Need to solve the problem of typestring input being too slow
   The official library has been basically unmaintained since 2020. When I used version 0.6 of this library, I found that when using typestring, it takes a long time to input each character. Very poor experience.

3. Upgrade the dependent node-gyp version
   The node-gyp version used by the old robot.js is too low, and it also relies on python 2.7, a version that is no longer officially maintained. If the computer is in a python 3 environment, it will not compile.

4. It is convenient for bug checking and customization, and you can also learn the knowledge of node addon in sequence.

# Modify as follows:

1. Removed some useless interfaces.
2. A lot of test cases have been removed. I feel that these test cases only check whether there are exceptions in the interface call, and cannot really test whether the interface is correct, which is a bit useless. It is possible to delete them all later.

# use

## Install dependencies

`npm install robotjs_addon`

## Call

```
const robot = require("robotjs_addon");

robot.typeString("Hello World");

robot.keyTap("enter");

```

# The supported interfaces are as follows

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

## Others

This library has been pre-compiled for windows/linux/mac, and does not require a c++ compilation environment during installation.

# Custom development instructions

## Install dependencies

```
npm install --build-from-source
```

## Pack

```
npm run pack
```

## Release package

Code using [node-pre-gyp-github](https://www.npmjs.com/package/node-pre-gyp-github)

This is just to explain, it has been integrated into github_action

### First you need a github token

go to Settings -> Developer settings

click Personal access tokens

click Generate new token

Select public_repo and repo_deployment

Generate Token

copy the key that's generated and set NODE_PRE_GYP_GITHUB_TOKEN environment variable to it. Within your command prompt:

SET NODE_PRE_GYP_GITHUB_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

After setting the environment variable NODE_PRE_GYP_GITHUB_TOKEN, you can publish it.

```
npm run release

```

# github_action description

## build.yml

Responsible for compiling node modules for each platform and uploading them to github release

## pub_npm.yml

Responsible for packaging npm package and uploading to npm registry

# Record of problems encountered

## Question 1: Error when compiling on Linux

```
../node_modules/node-addon-api/napi-inl.h:2464:34: error: cannot bind non-const lvalue reference of type ‘Napi::CallbackInfo&’ to an rvalue of type ‘Napi::CallbackInfo’
```

The reason is

Napi::Object node_getMousePos(Napi::CallbackInfo &info)

The parameters should be added const

Napi::Object node_getMousePos(const Napi::CallbackInfo &info)

## Question 2:

```
./src/mouse.c:12:10: fatal error: X11/extensions/XTest.h: No such file or directory
```

It says online that you need to install the library

```
ubuntu:

$ sudo apt-get install xorg-dev

centeros

$ sudo yum install xorg-x11\*
```

# refer to

[node-addon-api](https://github.com/nodejs/node-addon-api)

[node-gyp-github](https://www.npmjs.com/package/node-pre-gyp-github)

[node-sqlite3](https://github.com/TryGhost/node-sqlite3)

[node-pre-gyp](https://github.com/mapbox/node-pre-gyp)

[robotjs](https://www.npmjs.com/package/robotjs)

# Conclusion

If you have any questions, you can raise an issue and we can make progress together.
