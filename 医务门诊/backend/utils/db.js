const mongoose = require('mongoose')

// 数据库的链接
mongoose.connect('mongodb://localhost:27017/menzhen', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// 连接成功
mongoose.connection.on('success', () => {
    console.log('数据库连接成功')
})

// 连接失败
mongoose.connection.on('error', () => {
    console.log('数据库连接失败')
})

// 创建文档规范
const Schema = mongoose.Schema

// 用户
const UserSchema = new Schema({
    username: String,
    password: String,
    sno: Number,
    email: String,
    phone: String,
    age: Number,
    name: String,
    sex: String,
    address: String,
    identify: String,
    registerTime: String,
    state: String,
    doctor: String,
    role: Number,
    userList: Array,
    workTime: Array,
    regTime: String,
    regList: Array
})

// 创建表
const Users = mongoose.model('Users', UserSchema)

module.exports = {
    Users
}