const express = require('express')
const authController = require('./controllers/authController')
const collectionController = require('./controllers/collectionController')
const dashboardController = require('./controllers/dashboardController')
const taskController = require('./controllers/taskController')
const userController = require('./controllers/userController')

const routes = express.Router()

// Routas
routes.get("/", dashboardController.index)

routes.get("/loginIn", authController.loginIn) // fazer login
routes.get("/loginUp", authController.loginUp) // criar conta
routes.get("/signGoogle", authController.signGoogle) // google api
routes.get("/signGithub", authController.signGithub) // github api

routes.post("/register", authController.register)
routes.post("/authenticate", authController.authenticate)

routes.get("/authorized/", dashboardController.authorized) // Routes authorized
routes.get("/authorized/collection/:id", collectionController.index)
routes.post("/authorized/collection/create", collectionController.create)
routes.post("/authorized/collection/delete/:id", collectionController.delete)
routes.post("/authorized/collection/update/:id", collectionController.update)

routes.get("/authorized/user/config", userController.config)
routes.post("/authorized/user/update", userController.update)

routes.post("/authorized/task/create/:id", taskController.create)
routes.post("/authorized/task/delete/:idCollection/:index", taskController.delete)
routes.post("/authorized/task/done/:idCollection/:index", taskController.done)
routes.post("/authorized/task/update/:idCollection/:index", taskController.update)

module.exports = routes;