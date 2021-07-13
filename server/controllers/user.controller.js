const User = require("../models/user.model");

module.exports.findAllUsers = (req, res) => {
    User.find()
        .then(allUsers => res.json({ users: allUsers }))
        .catch(err => res.json({ message: "Something went wrong. Can't GET all the users", error: err })); //if it's false
};

module.exports.findOneSingleUser = (req, res) => {
	User.findOne({ _id: req.params.id })
		.then(oneSingleUser => res.json({ user: oneSingleUser }))
		.catch(err => res.json({ message: "Something went wrong. Can't GET one user", error: err }));
};

module.exports.createNewUser = (req, res) => {
    User.create(req.body) 
        .then(newlyCreatedUser => res.json({ user: newlyCreatedUser }))
        .catch(err => res.json({ message: "Something went wrong. Can't CREATE a user", error: err }));
};

module.exports.updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }) 
        .then(updatedUser => res.json({ user: updatedUser }))
        .catch(err => res.json({ message: "Something went wrong. Can't UPDATE/POST/PUT a user", error: err }));
};

module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.json({ message: "Something went wrong. Can't DELETE a user", error: err }));
};
