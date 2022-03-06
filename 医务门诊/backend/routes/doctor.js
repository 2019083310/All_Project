const express = require('express')
const router = express.Router()

const { addDoctor, getAllDoctorWork, getPersonInfo, editRegState, findAllRegInfo } = require('../controllers/doctor')
const { auth } = require('../controllers/users')

// 医生添加
router.post('/add', auth, addDoctor)

// 获取医生的个人信息
router.get('/info', auth, getPersonInfo)

// 获取所有医生的姓名和就诊日期
router.get('/allInfo', auth, getAllDoctorWork)

// 医生修改用户的挂号状态
router.put('/editRegState', auth, editRegState)

// 查询所有病人的挂号信息
router.get('/allRegInfo', auth, findAllRegInfo)

module.exports = router