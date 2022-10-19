const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    country: String,
    stickers: Object,
    duplicates: Object
});

const sectionModel = mongoose.model("users", userSchema);

module.exports = sectionModel;