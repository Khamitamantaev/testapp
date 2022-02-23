module.exports = app => {
    const data = require('../controllers/data.controller')
    var router = require('express').Router();

    router.post("/push", data.create);

    app.use('/api/data', router)
}