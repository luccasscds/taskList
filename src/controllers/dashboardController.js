const User = require('../model/User')

module.exports = {
    index(req, res) {
        res.render('index', { user : undefined })
    },

    async authorized(req, res){
        const users = await User.get()
        const {userId} = req
        
        const userOnLine = users.find( user => {
            if(user.id === userId){
                user.password = undefined
                return user
            }
        })

        res.render('index', { user: userOnLine })
    }
}