require('dotenv').config();
const express = require('express')
var uuid = require('uuid');
var bodyParser = require('body-parser')
var moment = require('moment');
const app = express()
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express'); 
const swaggerDocument = YAML.load('swagger.yaml'); 
const port = process.env.PORT
const cron = require("node-cron");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// parse application/json
app.use(bodyParser.json())

require("./routes/data.routes")(app);

const db = require("./models");
db.sequelize.sync();
const Data = db.data


db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });



app.post("/api/clear", (req, res) => {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  const test = regexExp.test(req.body.code);
  if (!test) {
    res.status(400).send({
      message: "invalid code"
    })
  } else {
    Data.deleteMany(function (err) {
      if (err) {
        console.log(err)
      }
      const generated = uuid.v4();
      res.send({
        code: generated
      })
    })
  }
});

//cron with Date Check
cron.schedule("* * * * *", function () {
  var now = moment().toDate();
  console.log(now)
  Data.deleteMany({ expirationTime: { $lte: now } }, function (err) {
    if (err) {
      console.log(err)
    }
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${3000 || process.env.PORT}`)
})