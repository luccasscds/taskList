const user = require('../model/User')

module.exports = {
    index(req, res) {
        res.render('index', { user })
    },

    async authorized(req, res){
        const users = await user.get()
        const {userId} = req
        
        let userOnLine = users.find( user => {
            if(user.id === userId){
                user.password = undefined
                return user
            }
        })

        res.render('index', { user: userOnLine })
    }
}