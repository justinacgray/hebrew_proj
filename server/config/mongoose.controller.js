const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/hebrew_app", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("WE IN HERE! Established connection to the database. YAY!"))
	.catch(err => console.log("WHOP WHOP...Something went wrong when connecting to the database", err));