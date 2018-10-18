const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipientItemsSchema = new Schema({
  article: { type: String, required: false },
  size: { type: String, required: false },
  donated: { type: Number, required: false },
  incorrect: { type: Number, required: false },
  status: { type: String, required: false},
  recipient: {type: Schema.Types.ObjectId, ref: "recipient"}
}, {timestamps: true});

const RecipientItems = mongoose.model("RecipientItems", recipientItemsSchema);

module.exports = RecipientItems;
