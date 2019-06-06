const mongoose = require('mongoose')
const User = mongoose.model('User')
import bcrypt from 'bcrypt-nodejs'

const SALT_WORK_FACTOR = 10

const sleep = async (time) => new Promise((resolve)=> {
    setTimeout(()=> {
        resolve()
    }, time)
})

export const getUsers = async (type) => {
    let users;
    if(type) {
        users = await User.find({type}).sort({
            'meta.createdAt': -1
        })
    }else {
        users = await User.find({}).sort({
            'meta.createdAt': -1
        })
    }
    return users
}

export const getUserOne = async (_id) => {
    const user = await User.findOne({_id})
    return user
}

export const getUserOneByName = async (name) => {
    const user = await User.findOne({name})
    return user
}

/********修改密码，加密这块待完善
********/
export const modUser = async (info) => {
    const {_id } = info;
    // 加密
    if(info.password){
        let modUser = null;
        bcrypt.genSalt(SALT_WORK_FACTOR, async (err, salt) => {
            if (err){
                return false
            } 
        
            bcrypt.hash(info.password, salt, async (error, hash) => {
                if (error){
                    return
                }
    
                info.password= hash
                // new: true 目的是让返回修改后的结果，默认为原数据
                modUser = await User.findOneAndUpdate({_id}, {$set: info}, { runValidators: true, new: true });
                // console.log(modUser)
            })
        })

        await sleep(1000)
        return modUser
    }else {
        const modUser = await User.findOneAndUpdate({_id}, {$set: info}, { runValidators: true, new: true });
        if(modUser) {
            return modUser
        }else{
            return false
        }
    }
    

    
    
}

export const addUser = async (info) => {
    // console.log(info)
    const newUser = await User.create(info)
    if(newUser) {
        return newUser
    }
}

export const delUserOne = async (_id) => {
   const res = User.deleteOne({_id}, (err, item)=> {
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
    // console.log(name,password)

    let match = false

    const user = await User.findOne({name: name}).exec()

    if(user){
        match = await user.comparePassword(password, user.password)
    }

    return {
        user,
        match
    }
}
