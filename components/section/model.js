const { default: mongoose } = require("mongoose");

const sectionSchema = new mongoose.Schema({
    title: String,
    key: String,
    order: Number,
    amount: Number,
    code: String
});

const sectionModel = mongoose.model("sections", sectionSchema);

module.exports = sectionModel;