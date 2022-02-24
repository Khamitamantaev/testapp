const db = require("../models");
const Data = db.data;
var CryptoJS = require("crypto-js")
var crypto = require('crypto')
// Create and Save a new Data
exports.create = (req, res) => {
  //Validate request
  if (!req.body.data) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  var secret = 'secret'
  var admin_secret = 'adminsecret'
  var hash = crypto.createHmac('SHA256', secret).update(req.body.data).digest('base64').replace('/','repla22')
  var hashadmin = crypto.createHmac('SHA256', admin_secret).update(req.body.data).digest('base64').replace('/','repla22')

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
      // console.log("data: " + data.data)
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



// Retrieve all Data from the database.
exports.findAll = (req, res) => {

};
// Find a single Data with an id
exports.findOne = (req, res) => {
  const decrypt_data = req.params.shareCode;
  
  Data.findOne({ shareCode: decrypt_data })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Data with id " + id });
      else res.send(data.data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Data with data=" + parsedStr });
    });
};
// Update a Data by the id in the request
exports.update = (req, res) => {

};
// Delete a Data with the specified id in the request
exports.delete = (req, res) => {

};