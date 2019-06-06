import Koa from 'koa'
// import views from 'koa-views'
import { resolve } from 'path'
import R from 'ramda'
import server from 'koa-static'
import { connect, initSchemas } from './db/init'
import fs from 'fs'
import path from 'path'
import https from 'https'

import mongoose from 'mongoose'

// 初始化数据
async function initDB() {
    // await users.create(user);
}

const MIDDLEWARES = ['common', 'router', 'parcel']
const useMiddlewares = (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ),
            require,
            name => resolve(__dirname, `./middlewares/${name}`)
        )
    )(MIDDLEWARES)
}

;(async () => {
    await connect()
    initSchemas()
    // 初始化数据
    initDB()

    const app = new Koa()
    await useMiddlewares(app)

    // 设置静态目录
    app.use(server(resolve(__dirname, './public')))
    app.use(server(resolve(__dirname, '../xxx/xx')))

    // 注：在设置NODE_ENV时&&左边不要空格，否则会识别成'development '
    if(process.env.NODE_ENV === 'development') {
        app.listen(3000)
    }else{
        // 创建https服务器实例
        const httpsServer = https.createServer(credentials, app.callback())

        // 设置https的访问端口号
        const SSLPORT = 3000

        // 启动服务器，监听对应的端口
        httpsServer.listen(SSLPORT, () => {
        console.log(`HTTPS Server is running on: https://localhost:${SSLPORT}`)
        })
    }

})()



