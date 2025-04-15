require('dotenv').config()
const authMiddleware = require('./middlewares/auth')
const express = require('express')
const server = express()
const path = require("path")
const routes = require('./routes')

server.set("view engine", "ejs")

server.set('views', path.join(__dirname, 'views'))

server.use(express.static("public"))

server.use(express.urlencoded( {extended: true} ))

//Está ouvindo esta rota com o middleware
server.use('/authorized/',authMiddleware)

server.use(routes)

const port = process.env.PORT || 3000
server.listen(port)
console.log("Server is running on port "+ port)