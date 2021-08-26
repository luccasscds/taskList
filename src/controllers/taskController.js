const Collections = require("../model/Collection");

module.exports = {
    async create(req,res) {
        const { token } = req;
        const { id } = req.params;
        const { name } = req.body;
        const collections = await Collections.get();

        const newCollection = collections.find( collection => {
            if(collection.id == id){
                const tasks = JSON.parse(collection.task);
                tasks.push({
                    id: tasks.length + 1,
                    name: name,
                    checked: "false"
                });
                collection.task = JSON.stringify(tasks);
                return collection;
            };
        });
        await Collections.update(newCollection, id);
        
        return res.redirect(`/authorized/collection/${id}?token=${token}`);
    }
}