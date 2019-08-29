# O2O研发中心数据研发部后台系统通用前端框架模板


这个项目基于 [Ant Design Pro v4 ( Javascript 版本 ) ](https://pro.ant.design) 构建. 


# 前端环境准备


## 安装nodejs 10.8.0


快速下载 `windows x64 platform` [https://nodejs.org/download/release/v10.8.0/node-v10.8.0-x64.msi](https://nodejs.org/download/release/v10.8.0/node-v10.8.0-x64.msi)
其他版本详见版本列表:
https://nodejs.org/download/release/v10.8.0/node-v10.8.0-x64.msi

安装过程一路默认next即可, 安装完 nodejs会自带`npm`
## 解压依赖包 `node_modules`
解压 `node_modules` 到当前文件夹, 解压完之后文件结构应该是这样的

```
config # 路由配置, 打包环境配置等
mock	 # mock 模拟数据
public # 默认公开资源, 无需更改
node_modules # 依赖包, 很大, 将本项目打包进其他后台java系统时务必在 .gitignore	文件中添加 **/node_modules, 禁止依赖包被提交到 git仓库 !!!
src	# 源代码主要所在目录
tests	# 测试文件夹,一般不需要改
.editorconfig # 以下文件一般不需要改
.eslintignore
.eslintrc.js	
.gitignore	
.prettierignore	
.prettierrc.js	
.stylelintrc.js	
CNAME	
README.md	
jest-puppeteer.config.js	
jest.config.js	
jsconfig.json	
package.json	
tsconfig.json	
```
# 启动项目
默认启动 http://localhost:8000/
```bash
npm start
```

# 打包项目

```bash
npm run build
```
打包完默认在 `$PROJECT_PATH/dist` 文件夹下



# 集成到 Java 项目中
> 这里以 `posagent` 项目为例, 简单介绍

 `posagent` 的项目结构是这样的.
 ```
 posagent-admin
 posagent-intf
 posagent-pom
 posagent-service	
 posagent-spark-jar	
 posagent-web	
 ```
在 `posagent-pom ` 文件夹下新建 `node` 文件夹, ` posagent-pom`的文件夹结构应该是这样的.
```
Servers	# 服务器配置
eclipse # eclipse
mvn	 # mvn
node # node项目
vars # 变量
pom.xml	# 主pom文件
```
约定 `node` 文件夹下的每一个子文件夹都代表了一个完整的前端工程.
将本项目放到node文件夹下
```
hulu 已存在的hulu 知识库前端源代码
admin O2O研发中心数据研发部后台系统通用前端框架模板
```

