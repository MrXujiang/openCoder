# pc

## Project setup
```
yarn install
```

### 开发环境
```
yarn run serve
```

### 生产环境
```
yarn run build
```

### 项目测试
```
yarn run test
```

### 项目架构
webapp --
  -- src  
      -- api 页面封装的请求  
      -- assets 静态资源存放区  
         -- js
         -- img
         -- css 
      -- components 组件   
      -- store vuex代码
      -- views 页面组件
         -- Home
         -- About
      -- utils 工具函数
         -- index
      -- App.vue 根组件
      -- main.js 入口
      -- router.js 路由  
      
  -- mock mock数据  

  -- vue.config.js vue-cli自定义配置  

  -- .eslintrc 语法检测配置文件

### 遵循原则
> 1.最小化组件拆分  

> 2.单一职责模式  

> 3.多用函数式编程方式 map, filter, reduce, some, any, forEach, every  

> 4.页面文件不超过300行，超过考虑拆分组件

> 5.命名规范  

    1.css 使用BEM命名规范  

    2.js 驼峰式命名  

    3.组件 大驼峰命名  

    4.文件和文件夹 驼峰式命名