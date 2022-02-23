const db = require("../models");
const Data = db.data;
// Create and Save a new Data
exports.create = (req, res) => {

    console.log(req.body.data)
    console.log(req.body.accessTimesCount)
    console.log(req.body.expirationTime)
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
      .then(data => {
        res.send(data);
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
  
};
// Update a Data by the id in the request
exports.update = (req, res) => {
  
};
// Delete a Data with the specified id in the request
exports.delete = (req, res) => {
  
};