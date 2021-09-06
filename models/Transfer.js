const mongoose = require("mongoose");
const {Types: {ObjectId}} = mongoose;
const {Currencies} = require("./constants/ModelContants");

const schema = new mongoose.Schema({
    amount: Number,
    trm: Number,
    currency: {
        type: String,
        enum: Currencies
    },
    origin: {
        type: ObjectId,
        ref: 'accounts'
    },
    recipient: {
        type: ObjectId,
        ref: 'accounts'
    },
});

module.exports = mongoose.model("Transfer", schema);