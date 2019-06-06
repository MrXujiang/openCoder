import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000
const Schema = mongoose.Schema

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  position: {
      type: String,
      required: true
  },
  phone: {
    type: String,
    required: true
  },
  role: {
      type: Number,
      required: true
  },
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  lockUntil: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})


adminSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})


adminSchema.pre('save', function (next) {
  // isNew代表当前字段是否更新
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

adminSchema.pre('save', function (next) {
  let admin = this
  // isModified()表示字段是否被修改
  if (!admin.isModified('password')) return next()
  // 第一个参数代表盐的权重，越大代表复杂度越高，但相对耗性能
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(admin.password, salt, null, (error, hash) => {
      if (error) return next(error)

      admin.password = hash
      // console.log(admin.password)
      next()
    })
  })
})

// 模型的实例方法
adminSchema.methods = {
  // 比对密码
  comparePassword: function (_password, password) {
    return new Promise((resolve, reject) => {
      console.log('222', _password, password)
      bcrypt.compare(_password, password, function (err, isMatch) {
        console.log('111', _password, password)
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  },

  incLoginAttempts: function () {
    const that = this

    return new Promise((resolve, reject) => {
      if (that.lockUntil && that.lockUntil < Date.now()) {
        that.update({
          $set: {
            loginAttempts: 1
          },
          $unset: {
            lockUntil: 1 // $unset用来将键完全删除，值设置为1表示删除
          }
        }, function (err) {
          if (!err) resolve(true)
          else reject(err)
        })
      } else {
        let updates = {
          $inc: {
            loginAttempts: 1
          }
        }

        if (that.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !that.isLocked) {
          updates.$set = {
            lockUntil: Date.now() + LOCK_TIME
          }
        }

        that.update(updates, err => {
          if (!err) resolve(true)
          else reject(err)
        })
      }
    })
  }
}

mongoose.model('Admin', adminSchema)