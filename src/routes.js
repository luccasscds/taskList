const express = require('express')
const authController = require('./controllers/authController')
const dashboardController = require('./controllers/dashboardController')

const routes = express.Router()

// Routas
routes.get("/", dashboardController.index)
routes.get("/authorized/", dashboardController.authorized)

routes.get("/loginIn", authController.loginIn)
routes.get("/loginUp", authController.loginUp)

routes.post("/signGoogle", authController.signGoogle)
routes.get("/signGithub", authController.signGithub)

routes.post("/register", authController.register)
routes.post("/authenticate", authController.authenticate)

module.exports = routes;