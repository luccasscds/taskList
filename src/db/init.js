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
            picture TEXT,
            isSignedIn TEXT
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
            picture,
            isSignedIn
        ) VALUES (
            "lucas@gmail.com",
            "",
            "vitor carlo",
            "https://lh3.googleusercontent.com/a/AATXAJwDuuC7vFqt7RtaP2EuGMjz4BGpJ8_-UI7h_I3x=s96-c",
            "false"
        );`)

        await db.run(`INSERT INTO collections (
            userId,
            name,
            task,
            color
        ) VALUES (
            "1",
            "trabalho",
            "[{"id":1,"name":"fazer o amorzao feliz","checked":"false"},{"id":2,"name":"levar o chocolate pra minha nega","checked":"true"},{"id":3,"name":"trabalho","checked":"false"}]",
            "#000000"
        );`)

        await db.close()
    }
}

initDb.init()