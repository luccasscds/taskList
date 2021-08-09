const {OAuth2Client} = require('google-auth-library');
const Database = require('../db/config')
const bcrypt = require('bcryptjs')

module.exports = {
    // Verificando token id do goole
    async verifyTokenGoogle(idToken) {
        const clientID = '911878798196-11jbdiam8s64rkcpkjb31061mqa2vrrj.apps.googleusercontent.com'
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
                family_name: payload.family_name,
                isSignedIn: "true"
            }
        }
    },

    async create(newUser){
        
        // Criptografando a senha do usuario
        const hash = await bcrypt.hash(newUser.password, 10)
        newUser.password = hash

        const db = await Database()

        await db.run(`INSERT INTO users (
            email,
            password,
            name,
            picture,
            given_name,
            family_name,
            isSignedIn
        ) VALUES (
            "${newUser.email}",
            "${newUser.password}",
            "${newUser.name}",
            "${newUser.picture}",
            "${newUser.given_name}",
            "${newUser.family_name}",
            "true"
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
        password="${updateuser.password}",
        name="${updateuser.name}",
        picture="${updateuser.picture}",
        given_name="${updateuser.given_name}",
        family_name="${updateuser.family_name}",
        isSignedIn="${updateuser.isSignedIn}"
        WHERE id = ${userId}
        `)

        await db.close()
    }
}