const User = require('../model/User')
const bcrypt = require('bcryptjs')
const authConfig = require('../config/auth.json')
const jsonwebtoken = require('jsonwebtoken')
const fetch = require('node-fetch')

// Gerar meu token
function gererateToken(id) {
    // gerar o token
    return jsonwebtoken.sign({id}, authConfig.secret, {
        expiresIn: 84600,
    })
}
// obter token do google
async function getTokenGoogle(code) {
    let idToken
    const url = 'https://oauth2.googleapis.com/token'
    const options = {
        method : "POST",
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body : new URLSearchParams({
            code : code,
            client_id : '911878798196-11jbdiam8s64rkcpkjb31061mqa2vrrj.apps.googleusercontent.com',
            client_secret : 'RW7YSCtKmUdaHkpZYSABLBEo',
            redirect_uri : 'http://localhost:3000/signGoogle',
            grant_type : 'authorization_code'
        })
    }

    await fetch(url, options).then( resp => resp.json())
    .then( resp => {
        idToken = resp.id_token
    })

    return idToken
}
// obter token do GitHub
async function getTokenGit(code) {
    const client_id = 'a304031e4c1e9ce53f74'
    const client_secret = '9a04141914533577b9a38b144ebba9d8b4e62187'
    let token

    const url = `https://github.com/login/oauth/access_token`
    const options = {
        method: "POST",
        headers: {
            "Accept" : "application/json"
        },
        body: new URLSearchParams({
            client_id : client_id,
            client_secret : client_secret,
            code : code
        })
    }

    await fetch(url, options).then( resp => resp.json() ).then(resp => {
        if(resp?.error) res.send({ error : resp.error})
        else token = resp.access_token
    })

    return token
}

module.exports = {
    async register(req, res) {
        const users = await User.get()
        const { email, password } = req.body
        let existe = false

        try {
            if(!email || !password) res.send('Campos vazios')

            if(email.indexOf('@') < 0) res.send('Formanto errado')

            // Verificar se a conta existe no banco de dados
            users.forEach( user => {
                if(user.email === email) {
                    existe = true
                    res.send("Usuário já existe")
                }
            })

            if(existe === false) {
                // Criar user no db
                await User.create(req.body)
                const newUsers = await User.get()

                // gerar o token depois que o user tiver criado no db
                newUsers.find( user => {
                    if(user.email === email) {
                        const token = gererateToken(user.id)
                        return res.redirect(`/authorized?token=${token}`)
                    }
                })
            }
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
        const {code} = req.query
        const idToken = await getTokenGoogle(code)

        if(idToken !== undefined){
            const payload = await User.verifyTokenGoogle(idToken)
            let existe = false
            
            // Verificar se a conta existe no banco de dados
            users.filter( user => {
                if(user.email === payload.email) {
                    existe = true
                    const token = gererateToken(user.id)
                    console.log(payload)
                    return res.redirect(`/authorized?token=${token}`)
                }
            })

            // se nao, crie a conta nova
            if(existe === false) {
                await User.create(payload)
                const newUsers = await User.get()

                newUsers.find( user => {
                    if(user.email === payload.email) {
                        const token = gererateToken(user.id)
                        return res.redirect(`/authorized?token=${token}`)
                    }
                })
            }
        }
        
        return res.send('Error')
    },

    // Fazer login atraves do GitHub
    async signGithub(req, res) {
        const users = await User.get()
        const {code} = req.query
        let newUser = {}

        // Fazer uma request com token do user
        async function getData() {
            const token = await getTokenGit(code)

            if(token != undefined) {
                const url = `https://api.github.com/user`
                const options = {
                    method : "GET",
                    headers : { "Authorization" : `token ${token}` }
                }

                await fetch(url, options).then( resp => resp.json())
                .then( resp => {
                    newUser = {
                        email: resp.login,
                        password: 'git',
                        name: resp.name,
                        picture: resp.avatar_url
                    }
                })
            }
        }

        // Chamando as funções
        await getData()

        const user = users.find( user => {
            return user.email === newUser.email ? user : undefined
        })

        if(user === undefined) {
            await User.create(newUser)
            const newUsers = await User.get()

            newUsers.find( user => {
                if(user.email === newUser.email) {
                    const token = gererateToken(user.id)
                    return res.redirect(`/authorized?token=${token}`)
                }
            })

        }else {
            const token = gererateToken(user.id)
            return res.redirect(`/authorized?token=${token}`)
        }
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