const { 
    controller,
    get,
    post,
    put,
    del,
    authAdmin,
    admin,
    required
 } = require('../lib/decorator')
const { 
    getAdmins,
    getAdminOne,
    addAdmin,
    modAdmin,
    checkPassword,
    delAdminOne
 } = require('../service/admin')

@controller('/api/admin')
class adminController {
    @get('/')
    @authAdmin
    async getAdmins (ctx, next) {
        const admins = await getAdmins()
    
        ctx.body = {
            admins
        }
    }

    @get('/:name')
    @authAdmin
    async getAdminOne (ctx, next) {
        const name = ctx.params.name
        const admin = await getAdminOne(name)
    
        ctx.body = {
            admin
        }
    }

    /**
     * 添加管理员
     * @param {*} ctx
     * @param {*} next
     */
    @post('/add')
    @authAdmin
    @admin(0)
    @required({
        body: ['name', 'password', 'phone', 'position', 'role']
    })
    async addAdmin (ctx, next) {
        const info = ctx.request.body;
        const admin = await addAdmin(info)
        
        if(admin) {
            ctx.body = {
                admin
            }
        } else {
            ctx.body = {
                mes: '添加失败'
            }
        }
    }

    /**
     * 修改管理员
     * @param {*} ctx 
     * @param {*} next 
     */
    @post('/mod')
    @authAdmin
    async modAdmin (ctx, next) {
        const info = ctx.request.body
        console.log(info)
        const admin = await modAdmin(info)
        if(admin) {
            ctx.body = {
                admin,
                code: 200
            }
        }
        
    }

    /**
     * 删除管理员
     */
    @del('/del')
    @authAdmin
    @required({
        query: ['_id']
    })
    async delAdmin (ctx, next) {
        let _id = ctx.query._id;

        const admin = await delAdminOne(_id)
        // console.log(admin)
        if(admin) {
            ctx.status = 200;
            ctx.body = {
                data: admin,
                mes: '删除成功'
            }
        }

        
    }

    /**
     * 管理员登录
     */
    @post('/login')
    @required({
        body: ['name','password']
    })
    async LoginAdmin (ctx, next) {
        let { name, password } = ctx.request.body;
        console.log(ctx.request.body)

        const admin = await checkPassword(name, password)
    
        if(admin.match){
            ctx.session.admin = {
                _id: admin.admin._id,
                username: admin.admin.username,
                role: admin.admin.role
            }
            // ctx.cookies.set('name', name, { signed: true })

            ctx.body = admin
        } else {
            ctx.body = {
                match: false
            }
        }
    }
}

export default adminController