const userModule = require('../models/users')
const moment = require('moment')
const { sign, verify } = require('../utils/tools')

// 用户注册
const signIn = async(req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8')
    const { phone } = req.body

    const result = await userModule.findUser(phone)

    if (result) {
        // console.log(result)
        res.render('fail', {
            data: JSON.stringify({
                message: '用户已存在'
            })
        })
    } else {
        const ret = await userModule.addUser({
                ...req.body,
                registerTime: moment().format('YYYY年MM月DD日 HH:mm:ss'),
                state: '未挂号',
                role: 0
            })
            // console.log(ret)
        if (ret) {
            const { id } = ret
            res.render('succ', {
                data: JSON.stringify({
                    message: '注册成功',
                    id
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '注册失败'
                })
            })
        }
    }
}

// 登录
const signUp = async(req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8')
    const { phone, password } = req.body
    const result = await userModule.findUser(phone)
    if (result) {
        if (password === result.password) {
            const { id, role } = result
            const token = sign(phone)
            res.set('Access-Control-Expose-Headers', 'X-Access-Token')
            res.set('X-Access-Token', token)
            res.render('succ', {
                data: JSON.stringify({
                    state: true,
                    id,
                    role
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    state: false,
                    message: '用户名或密码错误'
                })
            })
        }
    } else {
        res.render('fail', {
            data: JSON.stringify({
                state: false,
                message: '用户名或密码错误'
            })
        })
    }

}

// 返回用户列表
const findUser = async(req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8')
        // console.log(req.query)
    const { role } = req.query
    const result = await userModule.findUserList(role)
    const newArr = []
    const total = result.length
    if (result) {
        for (let item of result) {
            const { name, age, phone, identify, registerTime, email } = item
            const obj = { name, age, phone, identify, registerTime, email }
            newArr.push(obj)
        }

        res.render('succ', {
            data: JSON.stringify({
                state: true,
                newArr,
                total
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                state: false
            })
        })
    }
}

// 返回某个用户的基本信息
const findOne = async(req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8')

    const { phone } = req.query
    const result = await userModule.findUser(phone)
    if (result) {
        const { name, age, phone, identify, registerTime, email } = result
        const obj = { name, age, phone, identify, registerTime, email }
        res.render('succ', {
            data: JSON.stringify({
                state: true,
                obj
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                state: false
            })
        })
    }
}

// 返回某个用户的基本信息根据id
const findById = async(req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8')

    const { id } = req.query
    const result = await userModule.userInfo(id)
    if (result) {
        const { name, age, phone, identify, email, registerTime } = result
        const obj = { name, age, phone, identify, email, registerTime }
        res.render('succ', {
            data: JSON.stringify({
                state: true,
                obj
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                state: false
            })
        })
    }
}

// 修改某个用户的信息
const editInfo = async(req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8')
    const { phone } = req.body
    const result = await userModule.findUser(phone)
    if (result) {
        const { id } = result
        const ret = await userModule.updateInfo(id, {
            ...req.body
        })
        if (ret) {
            res.render('succ', {
                data: JSON.stringify({
                    state: true,
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    state: false
                })
            })
        }
    } else {
        res.render('fail', {
            data: JSON.stringify({
                state: false
            })
        })
    }

}

// 删除个人普通用户
const deleteInfo = async(req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8')
    const { phone } = req.query
    const result = await userModule.findUser(phone)
    if (result) {
        const { id } = result
        const ret = await userModule.deleteInfo(id)
        if (ret) {
            res.render('succ', {
                data: JSON.stringify({
                    state: true,
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    state: false
                })
            })
        }
    } else {
        res.render('fail', {
            data: JSON.stringify({
                state: false
            })
        })
    }
}

// 查询个人挂号信息
const registerInfo = async(req, res, next) => {

}

// 完成挂号
const userReg = async(req, res, next) => {
    res.set('Content-type', 'application/json;charset=utf-8')

    const { id, doctor, regTime } = req.body
    const result = await userModule.userInfo(id)
    if (result) {
        const { state, name, phone, age, regList } = result
        if (state === '未挂号') {
            const ret = await userModule.updateInfo(id, {
                ...req.body
            })
            const result2 = await userModule.userInfo(id)
            let ret2 = null
            const editDoctor = await userModule.findByName(doctor)
            const { userList } = editDoctor
            if (userList.length <= 800000) {
                userList.push({ name: name, time: regTime, phone: phone, age: age, state: result2.state })
                ret2 = await userModule.updateInfo(editDoctor.id, {
                    userList: userList
                })
            } else {
                res.render('fail', {
                    data: JSON.stringify({
                        state: false
                    })
                })
            }
            res.render('succ', {
                data: JSON.stringify({
                    state: true,
                })
            })

        } else {
            res.render('fail', {
                data: JSON.stringify({
                    state: false
                })
            })
        }
    } else {
        res.render('fail', {
            data: JSON.stringify({
                state: false
            })
        })
    }
}

// 验证token
const auth = (req, res, next) => {
    const token = req.get('X-Access-Token')
    try {
        const result = verify(token)
        next()
    } catch (e) {
        res.render('fail', {
            data: JSON.stringify({
                message: '请先登录!'
            })
        })
    }
}

// 返回用户的挂号历史
const getUserRegHistory = async(req, res, next) => {
    res.set('Content-Type', 'application/json;charset=utf-8')

    const { id } = req.query
    const result = await userModule.userInfo(id)
    if (result) {
        const { regList } = result
        res.render('succ', {
            data: JSON.stringify({
                state: true,
                regList
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                state: false
            })
        })
    }
}

module.exports = {
    signIn,
    signUp,
    findUser,
    findOne,
    editInfo,
    deleteInfo,
    registerInfo,
    findById,
    userReg,
    auth,
    getUserRegHistory
}