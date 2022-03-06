const doctorModule = require('../models/users')
const moment = require('moment')
const { json } = require('body-parser')

// 医生添加
const addDoctor = async(req, res, next) => {
    res.set('Content-type', 'application/json;charset=utf-8')

    const { phone, name } = req.body
    const result = await doctorModule.findUser(phone)
    const result2 = await doctorModule.findByName(name)
    if (result || result2) {
        // console.log(result)
        res.render('fail', {
            data: JSON.stringify({
                state: false,
                message: '该医生已存在'
            })
        })
    } else {
        const ret = await doctorModule.addUser({
                ...req.body,
                registerTime: moment().format('YYYY年MM月DD日 HH:mm:ss'),
                role: 1,
                workTime: ['2022年1月20日 8:30-12:00', '2022年1月21日 8:30-12:00', '2022年1月22日 8:30-12:00', '2022年1月23日 8:30-12:00', '2022年1月24日 8:30-12:00', '2022年1月25日 8:30-12:00', '2022年1月26日 8:30-12:00']
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

// 医生个人信息的获取
const getPersonInfo = async(req, res, next) => {
    res.set('Content-type', 'application/json;charset=utf-8')

    const { id } = req.query
    const result = await doctorModule.doctorInfo(id)
    if (result) {
        // console.log(result)
        const { name, age, phone, registerTime, email, userList } = result
        const obj = { name, age, phone, registerTime, email, userList }
        res.render('succ', {
            data: JSON.stringify({
                state: true,
                message: '获取成功',
                obj
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                state: false,
                message: '获取失败'
            })
        })
    }
}

// 获取所有医生的姓名和就诊时间
const getAllDoctorWork = async(req, res, next) => {
    res.set('Content-type', 'application/json;charset=utf-8')
    const { role } = req.query
    const result = await doctorModule.findUserList(role)

    const newArr = []
    if (result) {
        for (const item of result) {
            const { name, workTime } = item
            const children = []
            for (const it of workTime) {
                children.push({ label: it, value: it })
            }
            const obj = { label: name, children: children, value: name }
            newArr.push(obj)
        }

        res.render('succ', {
            data: JSON.stringify({
                newArr,
                state: true
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

// 修改用户的就诊状态
const editRegState = async(req, res, next) => {
    res.set('Content-type', 'application/json;charset=utf-8')

    let { phone, id, state } = req.body
    let result = null
    let result2 = null
    if (state === '已就诊') {
        result = await doctorModule.updateUserRegState(phone, {
            state: '未挂号'
        })
    } else {
        result = await doctorModule.updateUserRegState(phone, {
            ...req.body
        })
    }
    const { regTime } = result
    const ret = await doctorModule.doctorInfo(id)

    const { userList, name, age } = ret

    if (state === '已就诊') {
        const newObj = { doctor: name, age: age, phone: ret.phone, state: '已就诊', regTime: regTime }
        result.regList.push(newObj)
        result2 = await doctorModule.updateUserRegState(phone, {
            regList: result.regList,
            regTime: ''
        })
    }
    for (let item of userList) {
        if (item.phone === phone) {
            item.state = state
            const ret2 = await doctorModule.updateInfo(id, {
                userList: userList
            })
        }
    }
    if (result) {
        res.render('succ', {
            data: JSON.stringify({
                state: true
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

// 查询所有病人的挂号信息
const findAllRegInfo = async(req, res, next) => {
    res.set('Content-type', 'application/json;charset=utf-8')

    const { role, state } = req.query
    const result = await doctorModule.findAllRegInfo(role, state)
    const newArr = []
    if (result) {
        for (let item of result) {
            const { name, age, doctor, phone, regTime, state } = item
            const obj = { name, age, doctor, phone, regTime, state }
            newArr.push(obj)
        }
        res.render('succ', {
            data: JSON.stringify({
                newArr,
                state: true
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

// 医生删除某个病人的挂号记录


module.exports = {
    addDoctor,
    getAllDoctorWork,
    getPersonInfo,
    editRegState,
    findAllRegInfo
}