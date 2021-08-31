const Database = require('../db/config');

module.exports = {
    async get() {
        const db = await Database();

        const dados = await db.all(`SELECT * FROM collections`);

        await db.close();

        return dados;
    },

    async create( newCollection ) {
        const db = await Database();

        await db.run(`INSERT INTO collections (
            userId,
            name,
            task,
            color
        ) VALUES (
            '${newCollection.userId}',
            '${newCollection.name}',
            '${newCollection?.task}',
            '${newCollection?.color}'
        )`);

        await db.close();
    },
    
    async update( newCollection, id ) {
        const db = await Database();

        await db.run(`UPDATE collections SET 
        userId = '${newCollection.userId}',
        name = '${newCollection.name}',
        task = '${newCollection.task}',
        color = '${newCollection.color}'
        WHERE id = ${id}`)

        await db.close();
    },
    
    async delete(collectionId, userId) {
        const db = await Database();

        await db.run(`DELETE FROM collections WHERE id = ${collectionId} AND userId = ${userId}`);

        await db.close();
    },
};