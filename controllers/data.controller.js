const db = require("../models");
const Data = db.data;
var CryptoJS = require("crypto-js")
// Create and Save a new Data
exports.create = (req, res) => {
  //Validate request
  if (!req.body.data) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Data
  const data = new Data({
    data: req.body.data,
    accessTimesCount: req.body.accessTimesCount,
    expirationTime: req.body.expirationTime
  });
  // Save Data in the database


  data
    .save(data)
    .then((data) => {
      // console.log("data: " + data.data)
      var rawStr = data.data;
      var wordArray = CryptoJS.enc.Utf8.parse(rawStr);
      var encrypted_data = CryptoJS.enc.Base64.stringify(wordArray);
      res.send({
        shareCode: encrypted_data
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

  var parsedWordArray = CryptoJS.enc.Base64.parse(decrypt_data);
  var parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);

  console.log(parsedStr)
  
  Data.findOne({ data: parsedStr })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Data with id " + id });
      else res.send(data);
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