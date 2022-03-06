const { verify } = require('../utils/tools')

const isAuth = (req, res, next) => {
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

module.exports = {
    isAuth
}