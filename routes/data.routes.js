module.exports = app => {
    const data = require('../controllers/data.controller')
    var router = require('express').Router();

    router.post("/push", data.create);
    router.get("/:shareCode", data.findOne);
    router.put("/update", data.update);
    router.delete("/delete", data.delete);
    app.use('/api/data', router)
}