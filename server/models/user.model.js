const mongoose = require("mongoose");

const UserSignUpSchema = new mongoose.Schema({
    firstName: {
		type: String, 
		required: [true, "Frist name is required"], 
		minlength: [2, "First name must be at least 2 charactes long"]
    },
    lastName: {
		type: String, 
		required: [true, "Last name is required"], 
		minlength: [2, "Last name must be at least 2 charactes long"]
    },
    email: {
		type: String, 
		required: [true, "Email is required"], 
		minlength: [8, "Email must be at least 8 charactes long"]
    },
    userName: {
		type: String, 
		required: [true, "Username is required"], 
		minlength: [6, "Username must be at least 6 charactes long"]
    },
    password: {
		type: String, 
		required: [true, "Password is required"], 
		minlength: [8, "Last name must be at least 2 charactes long"]
	},
	date: {
		type: Date,
		default: Date.now
	},
	
})

UserSchema.virtual("confirmPassword")
	.get(() => this._confirmPassword)
	.set(value => (this._confirmPassword = value));

UserSchema.pre("save", function (next) {
	bcrypt.hash(this.password, 8)
		.then((hashPw) => {
		this.password = hashPw;
		next();
	})
})

module.exports = mongoose.model("User", UserSchema);


