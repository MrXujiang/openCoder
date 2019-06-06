const Router = require('koa-router')
const { resolve } = require('path')
const glob = require('glob')
const R = require('ramda')
const {upload} = require('./upload')

const symbolPrefix = Symbol('prefix')
const routerMap = new Map()

const isArray = (obj)=> Array.isArray(obj) ? obj : [obj]
export class Route {
    constructor (app, apiPath) {
        this.app = app
        this.apiPath = apiPath
        this.router = new Router()
    }

    init () {
        glob.sync(resolve(this.apiPath, './**/*.js')).forEach(require)
        // console.log(routerMap)
        for(let [conf, controller] of routerMap) {
            const controllers = isArray(controller)
            const prefixPath = conf.target[symbolPrefix]
            if(prefixPath) prefixPath = normalizePath(prefixPath)
            const routerPath = prefixPath + conf.path
            if(conf.path === '/upload') {
                this.router[conf.method](routerPath, upload.single('file'), ...controllers)
            }else{
                this.router[conf.method](routerPath, ...controllers)
            }
        }

        this.app.use(this.router.routes())
            .use(this.router.allowedMethods())
    }
}

const normalizePath = path => path.startsWith('/') ? path : `/${path}`

const router = conf => (target, key, descriptor) => {
    conf.path = normalizePath(conf.path)

    routerMap.set({
        target,
        ...conf
    }, target[key])
}

export const controller = path => target => (target.prototype[symbolPrefix] = path)

export const get = path => router({
    method: 'get',
    path
})

export const post = path => router({
    method: 'post',
    path
})

export const put = path => router({
    method: 'put',
    path
})

export const del = path => router({
    method: 'delete',
    path
})

export const all = path => router({
    method: 'all',
    path
})

const changeToArr = R.unless(
    R.is(isArray),
    R.of
)
// const convert = middleware => (target, key, descriptor) => {
//     target[key] = R.compose(
//         R.concat(
//             changeToArr(middleware)
//         ),
//         changeToArr
//     )(target[key])
//     return descriptor
// }

const d = (args, mid) => {
    let [ target, key, descriptor ] = args;
    target[key] = isArray(target[key])
    target[key].unshift(mid)
    // mid()
    // // console.log('迭代？', target[key])
    return descriptor
}

const convert = mid => (...args) => d(args,mid)

export const authAdmin = convert(async (ctx, next) => {
    if(!ctx.session.admin) {
        return (
            ctx.body = {
                success: false,
                code: 403,
                err: '登录信息失效，重新登录'
            }
        )
    }
    await next()
})

export const authUser = convert(async (ctx, next) => {
    if(!ctx.session.user) {
        return (
            ctx.body = {
                success: false,
                code: 403,
                err: '登录信息失效，重新登录'
            }
        )
    }
    await next()
})

export const admin = expectRole => convert(async (ctx, next) => {
    const { role } = ctx.session.admin
    if(role !== expectRole) {
        return (
            ctx.body = {
                success: false,
                code: 403,
                err: '你没有权限'
            }
        )
    }
    await next()
})

export const required = rules => convert(async (ctx, next) => {
    let errors = []
    console.log(ctx.request.body)
    R.forEachObjIndexed(
        (value, key) => {
            errors = R.filter(i => !R.has(i, ctx.request[key]))(value)
        }
    )(rules)

    if (errors.length) ctx.throw(412, `${errors.join(',')}是需要的`)

    await next()
})

// export const uploader = convert(async (ctx, next) => {
//     upload.single('file')
//     await next()
// })