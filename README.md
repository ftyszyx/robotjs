· English · [中文](./README-zh_CN.md)

# Description

This project is forked from robot.js: https://robotjs.io/.
The main purposes are as follows:

1. **Repackage the C++ interface using node-api.**  
   The original robot.js C++ packaging uses the V8 API. Different Node.js versions have compatibility issues, and switching Node.js versions requires recompilation. Now using node-api, this problem is resolved.

2. **Solve the issue of slow typestring input.**  
   The official library has not been maintained since 2020. When using version 0.6 of this library, I found that each character input in typestring takes a long time, resulting in a poor experience.

3. **Upgrade the version of the dependent node-gyp.**  
   The old robot.js uses a low version of node-gyp and relies on Python 2.7, which is no longer officially maintained. If the computer has a Python 3 environment, it will not compile.

4. **Facilitate bug tracking and customization, and also learn about Node addon knowledge.**

# Modifications:

1. Removed some unused interfaces.
2. Removed many test cases, as these test cases only check if the interface calls have exceptions and do not truly test if the interfaces are correct, making them somewhat redundant. They may all be deleted later.
