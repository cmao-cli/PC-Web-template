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
├── commitlint.config.js //commit规范配置文件
├── config //项目后台接口配置文件
│   ├── index.js
│   └── local.json
├── favicon.ico
├── js_transition.d.ts //ts定义
├── mlz-pack.js //@mlz/pack所需要的配置文件
├── package-lock.json
├── package.json
├── src
│   ├── App.tsx
│   ├── api //统一管理项目中的api请求
│   │   ├── admin.ts //按照不同的host来拆分命名
│   │   ├── error-code-parse.ts //错误码解析
│   │   └── index.ts //@mlz/axios封装配置
│   ├── commons //css images fonts等资源文件
│   │   ├── css
│   │   └── images
│   ├── components //项目公共组件
│   │   ├── page-not-found
│   ├── index.ejs
│   ├── index.tsx
│   ├── pages //路由
│   │   ├── index
│   │   │   ├── index.tsx
│   │   │   ├── index.scss
│   │   └── router.tsx //所有路由的配置文件
│   ├── redux
│   │   ├── demo //每个文件为一个state_model
│   │   │   ├── index.ts //action + reducer定义
│   │   │   └── selector.ts
│   │   │   └── saga.ts
│   │   ├── root-reducer.ts
│   │   ├── root-saga.ts
│   │   └── root-store.ts
│   └── utils
│       └── base.ts
├── tsconfig.json
├── tsfmt.json
└── tslint.json
```

