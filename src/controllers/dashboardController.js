const Collections = require('../model/Collection');
const User = require('../model/User');

module.exports = {
    index(req, res) {
        res.render('index');
    },

    async authorized(req, res){
        const collections = await Collections.get();
        const users = await User.get();
        const {userId, token} = req;
        const userOnLine = users.find( user => {
            if(user.id === userId){
                user.password = undefined
                return user;
            }
        });
        const newCollections = collections.filter( collection => {
            if(collection.userId == userId) {
                collection.task = JSON.parse(collection.task);
                return collection;
            };
        });
        res.render('dashboard', { user: userOnLine, token: token, collections: newCollections});
    }
};