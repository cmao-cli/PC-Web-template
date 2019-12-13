## 运行
npm run start
## 打包
npm run build

#### 依赖模块
- [@cmao/yummi](https://phab.srv.codemao.cn/source/yuumi/)(项目生成和启动)
- [@mlz/pack](https://github.com/juicecube/mlz-pack)webpack打包库
- [@mlz/axios](https://github.com/juicecube/mlz-axios)请求封装库
- [@mlz/config](https://phab.srv.codemao.cn/source/codemaster-mlz-config)通用的后端接口配置
- [@mlz/lint](https://github.com/juicecube/mlz-lint)(tsConfig和tslint的通用配置)

#### 项目结构
```
.
├── README.md
├── bin //线上运行项目的server文件
│   └── server.js
├── config //项目后台接口配置文件
│   ├── index.js
│   └── local.json
├── src
│   ├── api //统一管理项目中的api请求
│   │   ├── tiger.ts //tiger域名下的接口全放这里（以域名为单位划分文件）
│   │   ├── error-code-parse.ts //错误码解析
│   │   └── index.ts //@mlz/axios封装配置
│   ├── commons //css images fonts等公共资源文件
│   │   ├── css
│   │   └── images
│   │   └── fonts
│   ├── components //项目公共组件
│   │   ├── page-not-found
│   ├── hooks //项目公共hooks
│   ├── libs //项目第三方依赖，如实时通话、语音等的依赖文件
│   ├── index.ejs
│   ├── index.tsx
│   ├── pages //路由
│   │   ├── index
│   │   │   ├── index.tsx
│   │   │   ├── index.scss
│   │   └── router.tsx //所有路由的配置文件（总路由表）
│   ├── redux
│   │   ├── demo //每个文件为一个state_model
│   │   │   ├── index.ts //action + reducer定义
│   │   │   └── selector.ts
│   │   │   └── saga.ts
│   │   ├── root-reducer.ts
│   │   ├── root-saga.ts
│   │   └── root-store.ts
│   └── utils  //项目公共方法（若其他项目也用到了，欢迎向super-great-utils提需求）
│       └── index.ts
├── tsconfig.json
├── tsfmt.json
└── tslint.json
├── favicon.ico
├── commitlint.config.js //commit规范配置文件
├── js_transition.d.ts //ts定义
├── mlz-pack.js //@mlz/pack所需要的配置文件
├── .browserslistrc //配合@babel/preset-env 和 Autoprefixer 来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀
├── package-lock.json
├── package.json
```

## 使用

### 1、安装yuumi
```
npm i @cmao/yuumi -D
 ```
详情请见：https://shimo.im/docs/J8HQDwVtRXyRJtCP

### 2、使用yuumi拉下此模版
- init 一个新项目
```
yuumi init <project name>
```
- 根据提示选择PC—template
- 一个PC项目创建完成

### 3、enjoy coding


## 项目规范示例

地址： https://github.com/juicecube/standard-example


