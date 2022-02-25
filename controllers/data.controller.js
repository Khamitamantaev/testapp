require('dotenv').config();
const db = require("../models");

const Data = db.data;
const Logger = db.log

var CryptoJS = require("crypto-js")
var crypto = require('crypto')
// Create and Save a new Data
exports.create = (req, res) => {
  //Validate request
  if (!req.body.data) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  var secret = process.env.SECRET_KEY
  var admin_secret = process.env.ADMIN_SECRET_KEY
  var hash = crypto.createHmac('SHA256', secret).update(req.body.data).digest('base64').replace('/', 'repla22')
  var hashadmin = crypto.createHmac('SHA256', admin_secret).update(req.body.data).digest('base64').replace('/', 'repla22')

  // Create a Data
  const data = new Data({
    data: req.body.data,
    accessTimesCount: req.body.accessTimesCount,
    expirationTime: req.body.expirationTime,
    shareCode: hash,
    adminCode: hashadmin
  });

  // Save Data in the database
  data
    .save(data)
    .then((data) => {
      res.send({
        shareCode: hash,
        adminCode: hashadmin
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Data."
      });
    });
};
// Find a single Data 
exports.findOne = (req, res) => {
  const decrypt_data = req.params.shareCode;

  Data.findOneAndUpdate({ shareCode: decrypt_data }, 
                        {$inc : {accessTimesCount: -1}}, 
                        { useFindAndModify: false })  
    .then(data => {
      if (!data || data.accessTimesCount <= 0)
        res.status(400).send({
          status: 400,
          message: "Usage is not available data with accessCode: " + decrypt_data
        });
      else res.status(200).send({
        data: data.data
      })
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Data" + decrypt_data });
    });
};
// Update a Data in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const adminCode = req.body.adminCode;
  Data.findOneAndUpdate({ adminCode: adminCode }, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Data with adminCode=${adminCode}. Maybe Data was not found!`
        });
      } else res.sendStatus(200);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Data with adminCode =" + adminCode
      });
    });
};
// Delete a Data in the request
exports.delete = (req, res) => {
  const adminCode = req.body.adminCode;
  Data.findOneAndRemove({ adminCode: adminCode}, function(err){
      res.sendStatus(200)
      Logger.create({
        title: `Data removed`,
        description: `Data with adminCode: ${adminCode} removed`
      })
  })
  
};