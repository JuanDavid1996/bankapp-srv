const mongoose = require("mongoose");
const {AccountTypes} = require("./constants/ModelContants");
const {Types: {ObjectId}} = mongoose;

const schema = new mongoose.Schema({
    number: String,
    balance: Number,
    type: {
        type: String,
        enum: AccountTypes
    },
    owner: {
        type: ObjectId,
        ref: 'users'
    }
});

module.exports = mongoose.model("Account", schema);