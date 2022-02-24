const express = require('express')
var bodyParser = require('body-parser')
var moment = require('moment');
const app = express()
const port = 3000
const cron = require("node-cron");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

require("./routes/data.routes")(app);

const db = require("./models");
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
  console.log(`Example app listening on port ${port}`)
})