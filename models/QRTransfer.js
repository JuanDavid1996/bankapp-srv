const mongoose = require("mongoose");
const {Types: {ObjectId}} = mongoose;
const {Currencies, QR_TRANSFER_STATUSES} = require("./constants/ModelContants");

const schema = new mongoose.Schema({
    amount: Number,
    trm: Number,
    transferId: {
        type: String,
    },
    qr: String,
    currency: {
        type: String,
        enum: Currencies
    },
    status: {
        type: String,
        enum: QR_TRANSFER_STATUSES
    },
    recipient: {
        type: ObjectId,
        ref: 'accounts'
    },
});

module.exports = mongoose.model("QRTransfer", schema);