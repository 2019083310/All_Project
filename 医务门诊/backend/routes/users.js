const express = require('express')
const router = express.Router()

const { signIn, signUp, findUser, findOne, editInfo, deleteInfo, registerInfo, findById, userReg, auth, getUserRegHistory } = require('../controllers/users')
const { isAuth } = require('../middleware/isAuth')

// 验证token
router.get('/isAuth', isAuth)

// 注册用户
router.post('/signIn', signIn)

// 用户登录
router.post('/signUp', signUp)

// 查询用户信息
router.get('/findList', auth, findUser)

// 获取某个用户的基本信息
router.get('/findOne', auth, findOne)

// 获取某个用户的基本信息,根据id
router.get('/findUserInfo', auth, findById)

// 修改某个用户的基本信息
router.put('/editInfo', auth, editInfo)

// 删除个人普通用户
router.delete('/deleteInfo', auth, deleteInfo)

// 查询个人预约挂号信息
router.get('/regInfo', auth, registerInfo)

// 完成预约
router.put('/reg', auth, userReg)

// 返回个人挂号信息历史
router.get('/regHistory', getUserRegHistory)

module.exports = router