const Bundler = require('parcel-bundler')
const views  = require('koa-views')
const serve = require('koa-static')
const { resolve } = require('path')

const r = path => resolve(__dirname, path)

const bundler = new Bundler(r('../../../manage-web/index.html'), {
    publicUrl: '/',
    watch: true
})

export const dev = async app => {
    await bundler.bundle()
    app.use(serve(r('../../../manage-web/')))
    app.use(views(r('../../../manage-web/')), {
        extension: 'html'
    })

    app.use(async (ctx) => {
        await ctx.render('index.html')
    })
}