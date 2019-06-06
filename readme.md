### openCoder项目整体架构
openCoder
  -- manage 管理后台UI
  -- webapp 移动端app
     -- src
        -- api 页面封装的请求
        -- assets 静态资源存放区
            -- js
            -- img
            -- css 
        components 组件
        store vuex代码
        views 页面组件
            -- Home
            -- About
        utils 工具函数
            -- index
        mock mock数据
        App.vue 根组件
        main.js 入口
        router.js 路由
        vue.config.js vue-cli自定义配置
        .eslintrc 语法检测配置文件
  -- pc pc端UI
  -- server 服务端
     -- cert https等相关认证信息
     -- config 公共配置区
     -- crawel node爬虫区
     -- db 数据库
     -- dist 打包目录
     -- lib 通用脚本区
     -- middlewares 中间件
     -- parcel demo
     -- public 公共目录
     -- routes 路由区
     -- service 数据服务区
     -- task 子进程，子任务
     -- views 服务端视图区
     