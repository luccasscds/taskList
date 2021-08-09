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
            given_name TEXT,
            family_name TEXT,
            isSignedIn TEXT
        )`);

        // POVOANDO
        await db.run(`INSERT INTO users (
            email,
            password,
            name,
            picture,
            given_name,
            family_name,
            isSignedIn
        ) VALUES (
            "emailcobaia9@gmail.com",
            "",
            "vitor carlo",
            "https://lh3.googleusercontent.com/a/AATXAJwDuuC7vFqt7RtaP2EuGMjz4BGpJ8_-UI7h_I3x=s96-c",
            "vitor",
            "carlo",
            "false"
        );`)

        await db.close()
    }
}

initDb.init()