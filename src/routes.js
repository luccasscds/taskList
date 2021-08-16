const express = require('express')
const authController = require('./controllers/authController')
const dashboardController = require('./controllers/dashboardController')

const routes = express.Router()

// Routas
routes.get("/", dashboardController.index)
routes.get("/authorized/", dashboardController.authorized)

routes.get("/loginIn", authController.loginIn) // fazer login
routes.get("/loginUp", authController.loginUp) // criar conta
routes.get("/signGoogle", authController.signGoogle) // google api
routes.get("/signGithub", authController.signGithub) // github api

routes.post("/register", authController.register)
routes.post("/authenticate", authController.authenticate)

module.exports = routes;