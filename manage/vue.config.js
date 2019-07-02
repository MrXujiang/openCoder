// 自定义vue配置
const path = require('path');
const resolve = dir => path.join(__dirname, dir);
// mock数据
const mockData = require('./mock/test.json');

module.exports = {
    // 基本路径
    // baseUrl: '/',

    // 输出文件目录
    // outputDir: 'dist',

    // eslint-loader 是否在保存的时候检查
    // lintOnSave: true,

    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            less: {
                javascriptEnabled: true   // 解决.bezierEasingMixin();报错问题
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
   },

    devServer: {
        // 端口
        // port: 3000,

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
    // webpack配置
    chainWebpack: config => {
        config.resolve.alias.set('utils',resolve('../utils'))
    },
}