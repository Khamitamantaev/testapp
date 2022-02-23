module.exports = app => {
    const data = require('../controllers/data.controller')
    var router = require('express').Router();

    router.post("/push", data.create);
    router.get("/:shareCode", data.findOne);
    
    app.use('/api/data', router)
}