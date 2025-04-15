const {OAuth2Client} = require('google-auth-library');
const Database = require('../db/config')
const bcrypt = require('bcryptjs')

module.exports = {
    // Verificando token id do goole
    async verifyTokenGoogle(idToken) {
        const clientID = process.env.GOOGLE_CLIENT_ID
        const client = new OAuth2Client(clientID);

        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: clientID
        });
        let payload = ticket.getPayload();
        
        if(payload.aud === clientID && payload.iss === 'accounts.google.com' || 
        payload.iss === 'https://accounts.google.com'){
            return payload = {
                email: payload.email,
                password: "google",
                name: payload.name,
                picture: payload.picture,
                given_name: payload.given_name,
                family_name: payload.family_name
            }
        }
    },

    async create(newUser){
        
        // Criptografando a senha do usuario
        if(newUser.password !== 'google' && newUser.password !== 'git') {
            const hash = await bcrypt.hash(newUser.password, 10);
            newUser.password = hash;
        }

        const db = await Database()

        await db.run(`INSERT INTO users (
            email,
            password,
            name,
            picture
        ) VALUES (
            "${newUser.email}",
            "${newUser.password}",
            "${newUser.name}",
            "${newUser.picture}"
        )`)

        await db.close()
    },

    async get(){
        const db = await Database()

        const dados = await db.all(`SELECT * FROM users`)

        await db.close()

        return dados
    },

    async update(updateuser, userId){
        const db = await Database()

        await db.run(`UPDATE users SET 
        email="${updateuser.email}",
        name="${updateuser.name}",
        picture="${updateuser.picture}"
        WHERE id = ${userId}
        `)

        await db.close()
    }
}