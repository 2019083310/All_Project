const express = require('express')
const router = express.Router()

const { addAdmin } = require('../controllers/admin')

// 管理员添加接口
router.post('/add', addAdmin)

module.exports = router