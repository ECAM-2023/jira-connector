module.exports = app => {
    const login = require("../controllers-fe/fe_login.controller.js");

    var router = require('express').Router();


    router.get('/',login.findAll);
    
    router.post('/signup', login.create);





    app.use("/api/v1/jira/login", router);
}