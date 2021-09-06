const mongoose = require("mongoose");
const {Types: {ObjectId}} = mongoose;
const {MOVEMENT_TYPES, Currencies} = require("./constants/ModelContants");

const schema = new mongoose.Schema({
    amount: Number,
    amountInCop: Number,
    description: String,
    currency: {
        type: String,
        enum: Currencies
    },
    movement: {
        type: String,
        enum: MOVEMENT_TYPES
    },
    account: {
        type: ObjectId,
        ref: 'accounts'
    },
    transfer: {
        type: ObjectId,
        ref: 'transfers'
    },
    date: Date
});

module.exports = mongoose.model("Movement", schema);