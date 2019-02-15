# MusicAi

该项目框架使用 [Angular CLI](https://github.com/angular/angular-cli) 7.1.2 版本.

## 开发阶段

运行 `ng serve` 作为 dev server.  打开 `http://localhost:4200/`.

## Build 阶段

运行 `ng build`

## 计划

### 准备阶段

- 整理资料（需求分析，数据库设计，网页设计，详细设计）
- 需要的数据，需要的程序接口

  - 课程数据（练习题目，图片，音频，视频）
    - 50 道练习题（包括题目，题干的图片或音频，选项，正确答案）
    - 10 份教材（导学部分和视频）
    - 10 份例题精讲（例题， 考查知识，答案解析，延伸题型）
  - AI 评分的接口（已联系李匡，AI 评分程序目前运行在甲方的服务器上面）

- 技术框架

  采用 MEAN 的技术框架

  - 数据库: MongoDB (考虑到会有很多类型的课程和练习，MongoDB 具有 schema-less 特性，不用为了各种格式不一样的信息专门设置统一的格式，减少开发的工作)
  -  后端语言：NodeJS (对 MongoDB 的  各种操作提供很好的支持，可以使用 mongoose 减少数据库开发的工作)
  - 前端框架：Angular (属于客户端渲染框架，提供良好的用户交互体验)
  - 打包工具：Webpack
  - docker (增强程序的可移植性)
  - AntDesign (前端页面样式)

### 进度计划

- 进度安排计划
  - 12/28 - 12/31 完成数据库的设计和构建
  - 1/1 - 1/20 完成业务逻辑代码的编写
    - 1/1 - 1/6 用户的登录注册与权限控制模块
    - 1/7 - 1/12 管理员上传乐谱练习和制定教学课程的模块
    - 1/13 - 1/20 普通用户的学习模块和录音上传模块
  - 1/21 - 2/10 界面设计和实现
    - 用户登录注册界面
    - 首页
    - 管理员后台管理界面
    -  课程界面
    - 练习界面
    - 个人中心界面

### 实际进展

- 12/28 - 12/30 完成了数据库的设计和构建
- 1/1 - 1/9 用户登录注册以及 jwt 的应用
- 1/10 - 1/12 用户权限控制

### 进度计划更新

由于在实现过程中发现需要前后端同时开发，因此更新进度计划

- 12/28 - 12/31 完成数据库的设计和构建
- 1/1 - 2/15 完成业务逻辑代码的编写和前端界面的基本实现
  - 1/1 - 1/10 用户的登录注册
  - 1/10 - 1/20 用户的权限控制模块
  - 1/21 - 2/2 管理员上传乐谱练习和制定教学课程的模块
  - 2/3 - 2/15 普通用户的学习模块和录音上传模块
- 2/15 - 2/25 界面的美化

## TODO:

- 用户的课程详情页（ 课程包含的教程列表）根据文件类型，提供浏览或播放选项
- 用户的个人中心（头像上传， 个人资料修改，个人介绍）
- 管理员的用户管理
- 网站情况报告部分
- 优化CSS,JS
