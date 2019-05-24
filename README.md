# MusicAi

该项目框架使用 [Angular CLI](https://github.com/angular/angular-cli) 7.1.4 版本.

## 运行项目前的准备

- 安装[nodejs](https://nodejs.org/en/) v11.10.0
- 安装 npm。由于 v11 版本的 nodejs 自带 npm,所以无需单独安装 npm
- 安装 Angular CLI, `npm install -g @angular/cli`
- 安装[docker](https://www.docker.com/products/docker-desktop), 由于需要使用 mongoDB 数据库，利用 docker 增加程序的可移植性，所以直接安装 docker。

## 在本地运行项目

以下这些命令都是在项目根目录下运行

- 先安装需要的包。`npm install`
- 再把 docker 容器跑起来，主要是 mongodb 的服务。`docker-compose -d up`
- 运行后台。`npx nodemon server`
- 运行 Angular。`ng serve`

## 在云服务器上运行项目

- 跳转到项目根目录 `cd /home/musicAI/music`
- 将前端打包 `ng build --prod`
- 设置运行环境为产品环境 `export NODE_ENV=production`
- 设置 host 地址 `export HOST=59.110.154.187`
- 启动服务 `npx nodemon server` 。如果提示 4455 端口已被占有，需要手动杀掉进程。先用 `ps -aux|grep 'node'` 查看使用了 node 服务器的进程，再使用`kill -s 9 xxx`杀掉列出来的使用了 node 的进程。这里 xxx 为进程的 pid 号，即使用 ps 命令列出来的第二列的数字。

## 接口说明

- 评分和错误标注的代码都在服务器的`/home/musicAI/ml`目录下
- 评分是`/home/musicAI/ml/test`目录
- 错误标注是`keras-yolo3-master/fault`目录,主函数在`fault.py`里,代码跟评分的代码整合到一起了，调用`/home/musicAI/ml/test/code`目录下的`main.py`即可。
- 调用参数为 `python3 main.py 标准音频 用户音频` , 第一个参数为标准音频，即 abc 文件，第二个参数为用户的录音音频，为 mp3 或 wav 文件
- 在使用错误标注功能时，需要先生成五线谱音频坐标，具体操作请联系陈浩远
- 系统上传的文件都位于`/home/musicAI/music/server/uploads`目录下，abc 存储标准音频文件，recorders 存储用户音频文件。
- 具体的在 node 中调用 python 的代码可以参考项目的`server/resolvers/userRecord.resolver.js`中的`runPython`函数代码

## 开发阶段

运行 `ng serve` 作为 dev server.  打开 `http://localhost:4200/`.

## Build 阶段

运行 `ng build`

## 计划

### 准备阶段

- 技术框架

  采用 MEAN 的技术框架

  - 数据库: MongoDB (考虑到会有很多类型的课程和练习，MongoDB 具有 schema-less 特性，不用为了各种格式不一样的信息专门设置统一的格式，减少开发的工作)
  -  后端语言：NodeJS (对 MongoDB 的  各种操作提供很好的支持，可以使用 mongoose 减少数据库开发的工作)
  - 前端框架：Angular (属于客户端渲染框架，提供良好的用户交互体验)
  - AntDesign (前端页面样式)
  - 打包工具：Webpack
  - docker (增强程序的可移植性)

## 项目须知:

- mongoDB 版本需为 4.0 以上，经测试发现，当 mongoDB 版本为 2.6.10 时，系统无法正常运行。
- 代码的默认连接的主机为 localhost，mongoDB 为在云服务器上的数据库。如果需要更换连接的主机，需要设置 HOST=主机地址。如果需要更换连接的数据库，设置 MONGODB_URI=mongodb 的地址。以设置 host 参数为例，linux 和 mac 环境的设置方式为`export HOST=主机地址`，windows 环境下的设置方式为`SET HOST=主机地址`。
- 代码分为两个版本，一个是开发版，一个是产品版。默认运行的是开发版的代码。如果需要运行产品版的代码，需要设置`NODE_ENV=production`。
- 在该项目中有使用到录音功能，该录音功能利用了浏览器自带的`getUserMedia()`，但是目前 73 版本的 chrome 浏览器只支持在 localhost 或安全的网站源（如 https）使用，因此需要设定参数 `--unsafely-treat-insecure-origin-as-secure="example.com:port"`。其他浏览器如 Firefox 仍然支持该函数。
