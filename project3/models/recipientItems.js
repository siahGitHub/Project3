const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipientItemsSchema = new Schema({
  article: { type: String, required: false },
  size: { type: String, required: false },
  dontated: { type: Number, required: false },
  incorrect: { type: Number, required: false },
  status: { type: String, required: false},
  dateAdded: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now }
}, {timestamps: true});

const RecipientItems = mongoose.model("RecipientItems", recipientItemsSchema);

module.exports = RecipientItems;
