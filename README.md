
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


演示前台Demo: [https://pancake.jansora.com](https://pancake.jansora.com)
演示后台Demo: [https://admin.pancake.jansora.com](https://admin.pancake.jansora.com)


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


