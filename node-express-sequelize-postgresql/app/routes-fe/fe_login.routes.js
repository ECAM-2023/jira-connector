module.exports = app => {
    const login = require("../controllers-fe/fe_login.controller.js");

    var router = require('express').Router();

    router.post('/', login.create)
}