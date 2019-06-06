const mongoose = require('mongoose')
const Admin = mongoose.model('Admin')
import bcrypt from 'bcrypt-nodejs'

const SALT_WORK_FACTOR = 10

const sleep = async (time) => new Promise((resolve)=> {
    setTimeout(()=> {
        resolve()
    }, time)
})

export const getAdmins = async () => {
    const admins = await Admin.find({}).sort({
        'meta.createdAt': -1
    })

    return admins
}

export const getAdminOne = async (name) => {
    const admin = await Admin.findOne({name})
    return admin
}

/********修改密码，加密这块待完善
********/
export const modAdmin = async (info) => {
    const {_id } = info;
    // 加密
    if(info.password){
        let modAdmin = null;
        bcrypt.genSalt(SALT_WORK_FACTOR, async (err, salt) => {
            if (err){
                return false
            } 
        
            bcrypt.hash(info.password, salt, null, async (error, hash) => {
                if (error){
                    return
                }
    
                info.password= hash
                // new: true 目的是让返回修改后的结果，默认为原数据
                modAdmin = await Admin.findOneAndUpdate({_id}, {$set: info}, { runValidators: true, new: true });
                console.log(modAdmin)
            })
        })

        await sleep(1000)
        return modAdmin
    }else {
        const modAdmin = await Admin.findOneAndUpdate({_id}, {$set: info}, { runValidators: true, new: true });
        if(modAdmin) {
            return modAdmin
        }else{
            return false
        }
    }
    

    
    
}

export const addAdmin = async (info) => {
    const newAdmin = await Admin.create(info)
    if(newAdmin) {
        return newAdmin
    }
}

export const delAdminOne = async (id) => {
   const res = Admin.deleteOne({_id: id}, (err, item)=> {
        if (err) {
            console.log(err)
        } else {
            console.log('用户删除成功')
            return {
                code: 200,
                data: item
            }
        }
    })
    return await res
}

export const checkPassword = async (name, password) => {
    console.log(name,password)

    let match = false

    const admin = await Admin.findOne({name}).exec()

    if(admin){
        match = await admin.comparePassword(password, admin.password)
    }

    return {
        admin,
        match
    }
}