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
                const count = tasks.length <= 0 ? 0 : (tasks.length + 1) - 1;
                tasks.push({
                    id: count,
                    name: name,
                    checked: "false"
                });
                collection.task = JSON.stringify(tasks);
                return collection;
            };
        });
        await Collections.update(newCollection, id);
        
        return res.redirect(`/authorized/collection/${id}?token=${token}`);
    },

    async delete(req, res) {
        const {token} = req;
        const {index, idCollection} = req.params;
        const collections = await Collections.get();
        
        const newCollection = collections.find( collection => {
            if(collection.id == idCollection){
                const tasks = JSON.parse(collection.task);
                tasks.splice(index,1);
                tasks.forEach( (task, index) => {
                    task.id = index;
                });
                collection.task = JSON.stringify(tasks);
                return collection;
            };
        });

        await Collections.update(newCollection, idCollection);

        return res.redirect(`/authorized/collection/${idCollection}?token=${token}`);
    },

    async done(req, res) {
        const {token} = req;
        const {index, idCollection} = req.params;
        const collections = await Collections.get();

        const newCollection = collections.find( collection => {
            if(collection.id == idCollection){
                const tasks = JSON.parse(collection.task);
                tasks.forEach( task => {
                    if(task.id == index) {
                        if(task.checked == "true") {
                            task.checked = "false";
                        }else if(task.checked == "false") {
                            task.checked = "true";
                        }
                    };
                });
                collection.task = JSON.stringify(tasks);
                return collection;
            };
        });
        await Collections.update(newCollection, idCollection);
        return res.redirect(`/authorized/collection/${idCollection}?token=${token}`);
    }
}