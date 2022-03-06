const adminModule = require('../models/users')
const moment = require('moment')

// 管理员添加
const addAdmin = async(req, res, next) => {
    res.set('Content-type', 'application/json;charset=utf-8')

    const { phone } = req.body
    const result = await adminModule.findUser(phone)

    if (result) {
        // console.log(result)
        res.render('fail', {
            data: JSON.stringify({
                state: false,
                message: '该管理员已存在'
            })
        })
    } else {
        const ret = await adminModule.addUser({
                ...req.body,
                registerTime: moment().format('YYYY年MM月DD日 HH:mm:ss'),
                role: 2
            })
            // console.log(ret)
        if (ret) {
            const { id } = ret
            res.render('succ', {
                data: JSON.stringify({
                    state: true,
                    message: '添加成功',
                    id
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    state: false,
                    message: '添加失败'
                })
            })
        }

    }
}

module.exports = {
    addAdmin
}