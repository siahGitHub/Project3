const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipientSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    schoolGrade: { type: String, required: true },
    favoriteColor: { type: String, required: true }
}, {timestamps: true});

const Recipient = mongoose.model("Recipient", recipientSchema);

module.exports = Recipient;
