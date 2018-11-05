# vue-news
vue新手学习实现一个express+vue2+vue-resource+vue-router 2.0实现的简单知乎日报

### demo
- 测试版 没有采用数据库：后续加入
- [传送们-项目地址](http://qinsong.bceapp.com/)**[头像无法正确显示,由于采取百度BAE导致文件权限问题无法写入]**

### 下载

```
  git clone https://github.com/qinsong007/vue-news.git
  cd vue-news
  npm install (安装依赖模块)
  npm install webpack -g (没有安装webpack的需要安装)
```
### 运行
```
    cd bin 
    node www (服务器启动)

    cd vue-news (启动vue 脚手架)
    npm run dev (开发版本访问：http://localhost:3000/)
    npm run build （发布生产版本[自动输出到express->public 文件夹]）
```
### 功能
```
  1.登录退出
  2.注册、上传头像
  2.列表展示主题
  3.热门主题下拉刷新
  4.显示主题下内容
```

### 总结
```
1. 技术方案：
    1. 前端： vue2.0、MUSEUI、vue-router、vue-resource、vuex、webpack
    2. 后台：express(nodejs)
    3. 服务器：百度云，PM2 的 node 进程管理
    4. 开发工具：vscode
2. 目的：
    1. vue2.0全家桶+nodejs(express)实践
3. 功能：
    1. 系统主要分为登陆模块、主题模块、首页模块、详情模块、热门主题模块
    2. 实现首页数据的拉取和展示，和各个页面的 Loading，以及主题列表的收藏实现
    3. 实现基本的登陆和注册以及头像上传
4. 技术细节： 
    1. 使用服务端代理的跨域解决数据拉取和图片加载的问题
    2. UI差不多自己设计的,部分使用了museui框架
    3. 使用了flex.css模块布局，最大的感觉就是在写css不需要考虑在css中如何写布局，大大的提高了我的效率
    4. 数据管理：由于只提供基本的注册和收藏功能，利用了 nodejs 的 fs 模块直接写入
       到 json 文件，使用 formidable 模块处理图片写入
    5. 在服务器使用 connect-history-api-fallback 模块处理前端路由跳转
    6. 对于vue 内存管理、状态分包，还有待提高
    7. ES6中的箭头函数和变量解构赋值，以及一些数组字符串的语法糖，最大的感受在开发效率上。提高很多
    8. 简单的使用了淘宝弹性布局方案lib-flexible,由于专注于vue 这方面问题没有测试
    9. 借助webpack热启动，语法检查、ES6编译成ES5，模块化开发，代码压缩混淆......
    10. 前端自动化，工程化，给前端的发展起到了很大的推动作用



```



*仅供学习使用-1-1-主分支*
