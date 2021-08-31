const Database = require('./config')

const initDb = {
    async init(){
        const db = await Database()

        // CRIANDO TABELAS
        await db.exec(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT,
            password TEXT,
            name TEXT,
            picture TEXT
        )`);

        await db.exec(`CREATE TABLE collections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId TEXT,
            name TEXT,
            task TEXT,
            color TEXT
        )`);

        // POVOANDO
        await db.run(`INSERT INTO users (
            email,
            password,
            name,
            picture
        ) VALUES (
            'lucas@gmail.com',
            '$2a$10$iHDApjPhLZ.7ckK2ylnI4eeWAt/Pw2jWgKL9uWYLpzBapnt2.Z7oy',
            'Lucas silva',
            'https://lh3.googleusercontent.com/a/AATXAJwDuuC7vFqt7RtaP2EuGMjz4BGpJ8_-UI7h_I3x=s96-c'
        );`)

        await db.run(`INSERT INTO collections (
            userId,
            name,
            task,
            color
        ) VALUES (
            '1',
            'trabalho',
            '[{"id":0,"name":"fazer o amorzao feliz","checked":"false"},{"id":1,"name":"fazer um migau","checked":"false"}]',
            '#000000'
        );`)

        await db.close()
    }
}

initDb.init()