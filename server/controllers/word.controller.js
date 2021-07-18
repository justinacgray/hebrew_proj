const Word = require("../models/word.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.findallWords = (req, res) => {
  Word.find()
    .then((allWords) => res.json({ words: allwords }))
    .catch((err) =>
      res.json({
        message: "Something went wrong. Can't GET all the words",
        error: err,
      })
    ); //if it's false
};

module.exports.findOneSingleWord = (req, res) => {
  Word.findOne({ _id: req.params.id })
    .then((oneSingleWord) => res.json({ word: oneSingleWord }))
    .catch((err) =>
      res.json({
        message: "Something went wrong. Can't GET one word",
        error: err,
      })
    );
};

module.exports.createNewWord = (req, res) => {
  console.log(req.body);
  // res.sendFile(`${_dirname}/public/${req.file.filename}`);
  Word.create(req.file)
    .then((newlyCreatedWord) => res.send({ word: newlyCreatedWord }))
    .catch((err) =>
      res.send({
        message: "Something went wrong. Can't CREATE a word",
        error: err,
      })
    );
};

module.exports.updateWord = (req, res) => {
  Word.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((updatedWord) => res.json({ word: updatedWord }))
    .catch((err) =>
      res.json({
        message: "Something went wrong. Can't UPDATE/POST/PUT a word",
        error: err,
      })
    );
};

module.exports.deleteWord = (req, res) => {
  word
    .deleteOne({ _id: req.params.id })
    .then((result) => res.json({ result: result }))
    .catch((err) =>
      res.json({
        message: "Something went wrong. Can't DELETE a word",
        error: err,
      })
    );
};
