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
        res.status(400).send({
          status: 400,
          message: "Bad Request, not found with: " + decrypt_data
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
// Update a Data by the id in the request
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
      } else res.send({ message: "Data was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Data with adminCode =" + adminCode
      });
    });
};
// Delete a Data with the specified id in the request
exports.delete = (req, res) => {
  const adminCode = req.body.adminCode;
  Data.findOneAndRemove({ adminCode: adminCode },
    function (err, docs) {
      res.send({
        message: "Data was deleted successfully!"
      });
    })
};