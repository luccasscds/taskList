const User = require('../model/User')
const bcrypt = require('bcryptjs')
const authConfig = require('../config/auth.json')
const jsonwebtoken = require('jsonwebtoken')
const fetch = require('node-fetch')

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
        const idToken = req.query.token

        if(idToken != undefined){
            const payload = await User.verifyTokenGoogle(idToken)
            let existe = false
            
            // Verificar se a conta existe no banco de dados
            users.filter( user => {
                if(user.email === payload.email) {
                    existe = true
                    const token = gererateToken(user.id)
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
        
        return res.send('error')
    },

    // Fazer login atraves do GitHub
    async signGithub(req, res) {
        const users = await User.get()
        let newUser = {}
        
        // Fazer uma request com fetch
        async function getToken() {
            const client_id = 'a304031e4c1e9ce53f74'
            const client_secret = '9a04141914533577b9a38b144ebba9d8b4e62187'
            const {code} = req.query
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

        // Fazer uma request com token do user
        async function getData() {
            const token = await getToken()

            if(token != undefined) {
                const url = `https://api.github.com/user`
                const options = {
                    method : "GET",
                    headers : { "Authorization" : `token ${token}` }
                }

                await fetch(url, options).then( resp => resp.json())
                .then( resp => {
                    // User.create({
                    //     email: resp.login,
                    //     password: 'git',
                    //     name: resp.name,
                    //     picture: resp.avatar_url
                    // })
                    newUser = {
                        email: resp.login,
                        password: 'git',
                        name: resp.name,
                        picture: resp.avatar_url
                    }
                    // return res.send('usuário criado')
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