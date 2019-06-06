const { 
    controller,
    get,
    post,
    put,
    del,
    authUser,
    required
 } = require('../lib/decorator')
const { 
    getUsers,
    getUserOne,
    getUserOneByName,
    addUser,
    modUser,
    checkPassword,
    delUserOne,
    reportPj,
    joinChat,
    cancelReportPj
 } = require('../service/user')

@controller('/api/users')
class userController {
    @get('/:type?')
    async getUsers (ctx, next) {
        let type = ctx.query.type || ''
        console.log(type,'&&&&&')
        const users = await getUsers(type)
    
        ctx.body = {
            users
        }
    }

    @get('/:id')
    async getUserOne (ctx, next) {
        const id = ctx.params.id
        const user = await getUserOne(id)
    
        ctx.body = {
            user
        }
    }

    /**
     * 注册用户
     * @param {*} ctx
     * @param {*} next
     */
    @post('/add')
    @required({
        body: ['name', 'password', 'type']
    })
    async addUser (ctx, next) {
        const info = ctx.request.body;
        // console.log(info)
        const userExist = await getUserOneByName(info.name)
        if(userExist){
            ctx.body = {
                mes: '用户名已存在',
                code: 0   // 0创建失败 1创建成功
            }
            return
        }

        const user = await addUser(info)
        
        if(user) {
            ctx.session.user = {
                _id: user._id,
                username: user.name,
                role: user.type
            };

            ctx.body = {
                user,
                code: 1
            }
        } else {
            ctx.throw(500, {code:0, mes:'数据库错误'});
        }
    }

    /**
     * 修改账户信息
     * @param {*} ctx 
     * @param {*} next 
     */
    @post('/mod')
    async modUser (ctx, next) {
        const info = ctx.request.body
        // console.log(info)
        const user = await modAdmin(info)
        if(user) {
            ctx.body = {
                user,
                code: 200
            }
        }
        
    }

    /**
     * 删除用户
     */
    @del('/del')
    @required({
        query: ['_id']
    })
    async delUser (ctx, next) {
        let _id = ctx.query._id;

        const user = await delUserOne(_id)
        if(user) {
            ctx.status = 200;
            ctx.body = {
                data: user,
                mes: '删除成功'
            }
        }    
    }

    /**
     * 用户登录
     */
    @post('/login')
    @required({
        body: ['name','password']
    })
    async LoginUser (ctx, next) {
        let { name, password } = ctx.request.body;
        // console.log(ctx.request.body)

        const user = await checkPassword(name, password)
    
        if(user.match){
            ctx.session.user = {
                _id: user.user._id,
                username: user.user.name,
                role: user.user.type
            }
            // ctx.cookies.set('name', name, { signed: true })

            ctx.body = user
        } else {
            ctx.status = 404;
            ctx.body = '用户名或密码不正确';
        }
    }

    /**
     * 报名项目
     * @param {*} ctx 
     * @param {*} next 
     */
    @post('/report')
    @authUser
    async reportPj (ctx, next) {
        const {uid, pid} = ctx.request.body
        // console.log(info)
        const res = await reportPj(uid, pid)
        if(res) {
            ctx.body = {
                res,
                code: 200
            }
        }     
    }

    /**
     * 取消报名
     * @param {*} ctx 
     * @param {*} next 
     */
    @post('/cancelReport')
    @authUser
    async cancelReportPj (ctx, next) {
        const {uid, pid} = ctx.request.body
        // console.log(info)
        const res = await cancelReportPj(uid, pid)
        if(res) {
            ctx.body = {
                res,
                code: 200
            }
        }     
    }

    /**
     * 加入访谈
     * @param {*} ctx 
     * @param {*} next 
     */
    @post('/joinChat')
    @authUser
    async joinChat (ctx, next) {
        const {uid, cid} = ctx.request.body
        // console.log(info)
        const res = await joinChat(uid, cid)
        if(res) {
            ctx.body = {
                res,
                code: 200
            }
        }     
    }


    /**
     * 退出登录
     * @param {*} ctx
     * @param {*} next
     */
    @post('/logout')
    @authUser
    async logout (ctx, next) {
        ctx.session.user = null;
        ctx.body = {
            mes: '退出登录成功',
            code: 200
        }
    }
}

export default userController