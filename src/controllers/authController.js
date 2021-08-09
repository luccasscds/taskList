const User = require('../model/User')
const bcrypt = require('bcryptjs')
const authConfig = require('../config/auth.json')
const jsonwebtoken = require('jsonwebtoken')

function gererateToken(id) {
    // gerar o token
    return jsonwebtoken.sign({id}, authConfig.secret, {
        expiresIn: 84600,
    })
}

module.exports = {
    async register(req, res) {
        const users = await User.get()
        const { email, password } = req.body

        try {
            if(!email || !password) res.send('Campos vazios')

            if(email.indexOf('@') < 0) res.send('Formanto errado')

            // Verificar se a conta existe no banco de dados
            users.forEach( user => {
                if(user.email === email) res.send("Usuário já existe")
            })

            // Criar user no db
            // const user = await User.create(req.body)
    
            // gerar o token depois que o user tiver criado no db

            return res.send('Cadastro efetuado')
        } catch {
            return res.send('Erro no cadastro')
        }
    },

    async authenticate(req, res) {
        const users = await User.get()
        const { email, password } = req.body

        if(!email || !password) res.send('Campos vazios')

        users.forEach( user => {
            if(user.email === email) {
                let comparePasswd = bcrypt.compareSync(password, user.password)
                
                if(comparePasswd === true){
                    const token = gererateToken(user.id)
                    user.password = undefined
                    
                    return res.redirect(`/authorized?token=${token}`)
                }
            }

        } )
        res.send('Email ou senha está incorreto')
    },

    // Fazer login atraves do google
    async signGoogle(req, res) {
        const users = await User.get()
        const idToken = req.query.id

        if(idToken != undefined){
            const payload = await User.verifyTokenGoogle(idToken)
            let existe = false
            
            // Verificar se a conta existe no banco de dados
            users.filter( user => {
                if(user.email === payload.email) {
                    existe = true
                }
            })
            // se nao criar a conta nova
            if(existe === false) {
                User.create(payload)
            }
        }

        res.redirect('/')
    },

    // Página login in
    loginIn(req, res) {
        res.render("loginIn", { page: 'login' } )
    },

    // Página logn up
    loginUp(req, res) {
        res.render("loginUp", { page: 'login' } )
    }
}