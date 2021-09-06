const mongoose = require("mongoose");
const {Types: {ObjectId}} = mongoose;

const schema = new mongoose.Schema({
    name: String,
    owner: {
        type: ObjectId,
        ref: 'users'
    },
    accountType: String,
    accountNumber: String,
    account: {
        type: ObjectId,
        ref: "accounts"
    }
});

module.exports = mongoose.model("EnrolledAccount", schema);