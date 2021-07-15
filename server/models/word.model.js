const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    meaning: {
      type: String,
    },
    Description: {
      type: String,
    },
    list_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  },
  { timestamps: true }
);

const Word = mongoose.model("Word", WordSchema);

module.exports = Word;
