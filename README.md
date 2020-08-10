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

