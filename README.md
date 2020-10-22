
# 简介

## 演示

前台地址: [https://pancake.jansora.com](https://pancake.jansora.com) 管理端地址: [https://admin.pancake.jansora.com](https://admin.pancake.jansora.com) 测试账户: 用户名: Jansora 密码: demo

## what

这是一个名为 **Pancake** 的博客项目，Github地址： [https://github.com/Jansora/pancake](https://github.com/Jansora/pancake)

特性： 1. **博客**。用于管理各个类别的文章（不同类型的文章通过标签和模糊搜索来进行过滤） 2. **专栏**。类似于知乎，但增加了目录结构，用于更清晰的展示同一个专栏中不同文章之间的关系。 3. **项目**。 用于内嵌页面，不熟悉前端的人可能用不到。

## why

市面上的博客不太适合自己，因此DIY了一个适合自己的博客项目，命名为 **Pancake** 。 如果此博客项目刚好也适用于你，那么很荣幸能够帮到你。帮忙在 [Github](https://github.com/Jansora/pancake) 给个⭐️, 谢谢支持。

## when

本项目起于2017年11月份，定型于2019年9月份，期间经历多次版本迭代。[版本日志](https://pancake.jansora.com/topic/pancake/version)

## who

联系方式见 [https://jansora.com/concat](https://jansora.com/concat) 有任何疑问或建议，请联系我，欢迎骚扰。

## how

使用方式见[使用手册](https://pancake.jansora.com/topic/pancake/what-why-when-who-how)

## 技术栈

## 前端

### 前端\(应用\)

[React](https://reactjs.org) + [Material Design](https://material-ui.com).  
技术特点： 1. **No Class Component**. 使用 `Function Component` 覆写所有的 `Class Component` 2. **No Redux**. 使用 `createContext` 和 `useReducer` 替代 `Redux` 3. **No CSS，All in JS**. 使用 `style-components` 将 `css` 组件化

### 前端\(后台管理\)

[Ant Design Pro v4](https://pro.ant.design) 全部基于`React Hooks` 开发页面

## 后端

* **后端语言**: [Golang](https://golang.org)
* **后端Web框架**: [Gin](https://github.com/gin-gonic/gin)

## 数据

* **数据持久化**: [PostgreSQL 10 ](https://www.postgresql.org/)
* **文件/图片存储**: [阿里云对象存储](https://aliyun.com/product/oss)

## 编辑器

* **markdown 文本编辑器**: [react-markdown-editor-lite](https://github.com/HarryChen0506/react-markdown-editor-lite)

## Contributing

PRs accepted. &gt;

## License

MIT © Jansora

=======

# 简介

## 产品说明

Pancake 共分为三个模块, 博客, 专栏, 项目

* **博客**. 把踩过的坑和做过的东西记录下来, 便于自我总结和帮助他人🍊🍊 
* **专栏**. 用于归纳总结某一领域内的东西, 比如说Java教程, 大数据开发指南等等.
* **项目**. 把自己做过的东西\(xxx管理平台, 产品指南等\)通过iframe的方法嵌入到本站中, 整合web资源.

### 博客

博客主要功能用于存储文档, 有以下几个特点.

* **基于 markdown 构建**, markdown 文档编辑器请参见 [react-markdown-editor-lite](https://github.com/HarryChen0506/react-markdown-editor-lite)
* **支持目录结构**, 根据博客正文自动生成文章目录.
* **支持版本控制**, 所有编辑过的历史文档都存在数据库中, 方便查看历史数据.
* **支持自动保存**, 文档编辑停顿三秒后, 数据会自动保存至服务器, 每篇博客最多有100个自动保存历史.

### 专栏

### 项目





## 产品演示

> 基于Pancake构建的网站: [https://www.jansora.com](https://www.jansora.com)



演示Demo: [https://pancake.jansora.com](https://pancake.jansora.com) or [http://www.jansora.com:9191](http://www.jansora.com:9191)

## 版本说明

{% hint style="info" %}
2.0 版本进行了超级多的使用优化,  建议选择2.0版本.  ^-^
{% endhint %}

当前主干分支版本为 `2.0`  2.0 版本和 1.0 版本的主要区别如下:

### 功能对比

| 功能清单 | v 1.0 | v2.0 |
| :--- | :--- | :--- |
| 存储 | PostgreSQL + 阿里云对象存储 | PostgreSQL  + 阿里云对象存储 |
| 后端服务 | Golang + Gin | Java + Spring Boot |
| 前端实现 | React + Material UI | React + Semantic UI |
| 版本控制 | 无 | 支持文档历史版本查看 |
| 主页引导 | 无 | 支持 |
| 页面实现 | 用户端 + 管理端 | 用户端 |

### 源码地址

`1.0` [https://github.com/Jansora/pancake/tree/1.0](https://github.com/Jansora/pancake/tree/1.0)

`2.0` [https://github.com/Jansora/pancake/tree/2.0](https://github.com/Jansora/pancake/tree/1.0)


