const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')

const db = 'mongodb://localhost/test'


mongoose.Promise = global.Promise

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(
        require
    )
}

exports.connect = () => {
    let maxConnectCount = 0;
    return new Promise((resolve, reject) => {
        if(process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
        }
    
        // 加{useNewUrlParser:true}是为了避免node警告，是新版本需要指定的属性
        mongoose.connect(db, {useNewUrlParser:true})
    
        mongoose.connection.on('disconnected', ()=> {
            console.log('数据库连接中断')
            maxConnectCount++;
            if(maxConnectCount < 5) {
                mongoose.connect(db, {useNewUrlParser:true}, function(err){
                　　if(err){
                　　　　console.log('Connection Error:' + err)
                　　}else{
                　　　　console.log('Connection success!')
                    }
                })
            } else {
                throw new Error('数据库错误')
            }
        })
    
        mongoose.connection.on('error', ()=> {
            maxConnectCount++;
            if(maxConnectCount < 5) {
                mongoose.connect(db, {useNewUrlParser:true}, function(err){
                　　if(err){
                　　　　console.log('Connection Error:' + err)
                　　}else{
                　　　　console.log('Connection success!')
                    }
                })
            } else {
                throw new Error('数据库错误')
            }
        })
    
        mongoose.connection.once('open', ()=> {
            resolve()
            console.log('数据库连接成功')
        })
    })
}