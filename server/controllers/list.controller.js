const List = require("../models/list.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.findAllLists = (req, res) => {
  List.find()
    .then((allLists) => res.json({ lists: allLists }))
    .catch((err) =>
      res.json({
        message: "Something went wrong. Can't GET all the lists",
        error: err,
      })
    ); //if it's false
};

module.exports.findOneSingleList = (req, res) => {
  List.findOne({ _id: req.params.id })
    .then((oneSingleList) => res.json({ list: oneSingleList }))
    .catch((err) =>
      res.json({
        message: "Something went wrong. Can't GET one list",
        error: err,
      })
    );
};

module.exports.createNewList = (req, res) => {
  console.log(req.body);
  const list = new List(req.body);
  const decodeJwt = jwt.decode.apply(req.cookies.usertoken);

  List.create(req.body)
    .then((newlyCreatedList) => res.json({ list: newlyCreatedList }))
    .catch((err) =>
      res.json({
        message: "Something went wrong. Can't CREATE a list",
        error: err,
      })
    );
};

module.exports.updateList = (req, res) => {
  List.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((updatedList) => res.json({ list: updatedList }))
    .catch((err) =>
      res.json({
        message: "Something went wrong. Can't UPDATE/POST/PUT a list",
        error: err,
      })
    );
};

module.exports.deleteList = (req, res) => {
  List.deleteOne({ _id: req.params.id })
    .then((result) => res.json({ result: result }))
    .catch((err) =>
      res.json({
        message: "Something went wrong. Can't DELETE a list",
        error: err,
      })
    );
};
