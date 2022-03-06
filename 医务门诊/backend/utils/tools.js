const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')

// 生成token
const sign = (username) => {
    const privateKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'))
    const token = jwt.sign({ username }, privateKey, { algorithm: 'RS256' })
    return token
}

// 验证token
const verify = (token) => {
    const publicKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_public_key.pem'))
    const result = jwt.verify(token, publicKey)
}
module.exports = {
    sign,
    verify
}