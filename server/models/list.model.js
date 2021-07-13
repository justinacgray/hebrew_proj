const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
    title:  {
		type: String, 
		required: [true, "Title is required"], 
		minlength: [2, "First name must be at least 2 charactes long"]
    },
    Description:  {
		type: String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

module.exports = mongoose.model("List", ListSchema);