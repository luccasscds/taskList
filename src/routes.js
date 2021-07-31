const express = require('express')
const routes = express.Router()

routes.get("/", (req, res) => res.render("index"))
routes.get("/loginUp", (req, res) => res.render("loginUp", { page: 'login' } ))
routes.get("/loginIn", (req, res) => res.render("loginIn", { page: 'login' } ))

module.exports = routes;