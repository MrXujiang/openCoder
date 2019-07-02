// 自定义vue配置
const path = require('path');
const resolve = dir => path.join(__dirname, dir);
// mock数据
const mockData = require('./mock/test.json');

module.exports = {
    // 基本路径
    publicPath: './',

    // 输出文件目录
    // outputDir: 'dist',

    // eslint-loader 是否在保存的时候检查
    // lintOnSave: true,

    // 单/多页面
    pages: {
        index: {
          // page 的入口
          entry: 'src/main.js',
          // 模板来源
          template: 'public/index.html',
          // 在 dist/index.html 的输出
          filename: 'index.html',
          // 当使用 title 选项时，
          // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
          title: 'OpenCoder For PC',
          // 在这个页面中包含的块，默认情况下会包含
          // 提取出来的通用 chunk 和 vendor chunk。
        //   chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        // subpage: 'src/subpage/main.js'
    },

    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            // stylus: {
            //     // @/ 是 src/ 的别名
            //     // 所以这里假设你有 `src/variables.stylus` 这个文件, 不过目前测试无效
            //     data: `@import "~@/style/variables.styl";`
            //   }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
   },


    pluginOptions: {
        // 共享变量
        'style-resources-loader': {
            preProcessor: 'stylus',
            patterns: [
                //这个是加上自己的路径，
                //注意：试过不能使用别名路径
                resolve('src/style/variables.styl'),
            ]
        }
    },

    devServer: {
        // 端口
        port: 3000,

        // 配置代理
        proxy: {
            '^/api': {
              target: 'http://localhost:8081',
              ws: true,
              changeOrigin: true
            },
            '^/data': {
              target: 'http://localhost:3000'
            }
        },

        // mock
        before(app){
            app.get('/api/getUser',(req,res,next)=>{
                res.json(mockData);
            })
        }
    },
    // vue-cli内部webpack配置
    chainWebpack: config => {
        // 设置快捷目录别名
        config.resolve.alias.set('utils',resolve('../utils'))

        // 修改静态资源打包方式，下例为超过10k才用文件导入的方式，否则为base64.默认为4k
        // config.module
        // .rule('images')
        //     .use('url-loader')
        //     .loader('url-loader')
        //     .tap(options => Object.assign(options, { limit: 10240 }))
    },
    // webpack配置
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
          // 为生产环境修改配置...
        } else {
          // 为开发环境修改配置...
        }
    }
}