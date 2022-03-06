const { Users } = require('../utils/db')

// 查找用户
const findUser = (phone) => {
    return Users.findOne({ phone })
}

// 查找用户通过姓名
const findByName = (name) => {
    return Users.findOne({ name })
}

// 添加用户
const addUser = (data) => {
    return new Users(data).save()
}

// 返回该表中的所有基本用户/医生/管理员
const findUserList = (role) => {
    return Users.find({ role })
}

// 更新用户的基本信息
const updateInfo = (id, data) => {
    return Users.findByIdAndUpdate(id, data)
}

// 删除用户
const deleteInfo = (id) => {
    return Users.findByIdAndDelete(id)
}

// 获取医生个人的信息
const doctorInfo = (id) => {
    return Users.findById(id)
}

// 获取用户个人的信息
const userInfo = (id) => {
    return Users.findById(id)
}

// 查询所有病人信息
const findAllRegInfo = (role, state) => {
    return Users.find({ role, state })
}

// 更新病人的就诊状态
const updateUserRegState = (phone, data) => {
    return Users.findOneAndUpdate({ phone }, data)
}

const userRegH = (id) => {
    return Users.find({ id })
}

module.exports = {
    findUser,
    addUser,
    findUserList,
    updateInfo,
    deleteInfo,
    doctorInfo,
    userInfo,
    findByName,
    findAllRegInfo,
    updateUserRegState,
    userRegH
}