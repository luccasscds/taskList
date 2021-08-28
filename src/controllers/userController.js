const Users = require('../model/User');

module.exports = {
    async config(req, res) {
        const {userId, token} = req;
        const users = await Users.get();
        
        const user = users.find( user => {
            if(user.id == userId) {
                user.password = undefined;
                return user;
            }
        })
        return res.render('config', { user : user, token: token});
    },

    async update(req, res) {
        const {userId, token} = req;
        const {name, picture} = req.body;
        const users = await Users.get();
        
        const user = users.find( user => {
            if(user.id == userId) {
                user.password = undefined;
                return user;
            }
        });

        await Users.update({
            ...user,
            name: name,
            picture: picture
        }, userId);

        return res.redirect(`/authorized/user/config?token=${token}`);
    }
}