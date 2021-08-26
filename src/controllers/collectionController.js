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
        
        const tasks = JSON.parse(selctionCollections.task);

        return res.render('collection', { collection: selctionCollections ,tasks: tasks ,token: token});
    },
    
    async create(req, res) {
        const { name, color } = req.body;
        const { token, userId } = req;

        if(name == undefined || color == undefined || name == '' || color == '') return res.send({error : 'Dados inválidos'});
        // Create collection
        await Collections.create({
            userId: userId,
            name: name,
            color: color
        });
        
        return res.redirect(`/authorized?token=${token}`);
    },

    async delete(req, res) {
        const {userId, token} = req;
        const { id } = req.params;

        await Collections.delete(id, userId);

        return res.redirect(`/authorized?token=${token}`);
    },

    async update(req, res) {
        const {token} = req;
        const {id} = req.params;
        const {name, color} = req.body;
        const collections = await Collections.get();

        const newCollection = collections.find( collection => {
            if(collection.id == id) {
                return collection;
            };
        });

        await Collections.update({
            ...newCollection,
            name: name,
            color: color
        }, id);

        return res.redirect(`/authorized/collection/${id}?token=${token}`);
    }
};