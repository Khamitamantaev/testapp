module.exports = app => {
    const data = require('../controllers/data.controller')
    var router = require('express').Router();

    router.post("/push", data.create);
    router.get("/:shareCode", data.findOne);
    router.put("/:adminCode", data.update);
    app.use('/api/data', router)
}