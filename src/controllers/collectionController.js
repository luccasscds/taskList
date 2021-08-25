const Collections = require('../model/Collection');

module.exports = {
    async index(req, res) {
        const collections = await Collections.get();
        const {token, userId} = req;
        const {id} = req.params;

        const selctionCollections = collections.find( collection => {
            if(collection.id == id) {
                if(collection.userId == userId) {
                    return collection;
                };
            };
        });

        return res.render('collection', { collection: selctionCollections, token: token});
    },
    
    async create(req, res) {
        const { token, userId, name, color } = req.body;

        if(name == undefined || color == undefined || name == '' || color == '') return res.send({error : 'Dados inválidos'});
        // Create collection
        await Collections.create(req.body);
        // Get collection
        const collections = await Collections.get();

        const newCollections = collections.filter( collection => {
            if(collection.userId === userId) return collections;
        });
        
        return res.redirect(`/authorized?token=${token}`);
    },

    async delete(req, res) {
        const {userId, token} = req;
        const { id } = req.params;

        await Collections.delete(id, userId);

        return res.redirect(`/authorized?token=${token}`);
    }
};