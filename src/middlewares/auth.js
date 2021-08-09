const jsonWebToken = require("jsonwebtoken")
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const {token} = req.query

    if(!token) return res.send('No token provided')

    const parts = token.split('.')

    if(parts.length < 3) return res.send('Token error')
    
    jsonWebToken.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.send('Token invalid')

        req.userId = decoded.id
        next()
    })  
}