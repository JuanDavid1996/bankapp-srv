const {Types: {ObjectId}} = require("mongoose");
const AccountService = require("./AccountService");
const QRTransfer = require("../models/QRTransfer");
const {sameKey} = require("../utils/common");
const {CREATED, DONE} = require("../models/constants/ModelContants");
const {uuid} = require('uuidv4');
const QRCode = require('qrcode');
const TransferService = require("./TransferService");

const create = async (ownerId, {
    accountDestinationId,
    amount,
    currency,
}) => {
    const accountDestination = await AccountService.findAccount({_id: ObjectId(accountDestinationId)})

    if (!accountDestination) return Promise.reject("Cuenta destino no econtrada");

    if (!sameKey(accountDestination.owner, ownerId)) return Promise.reject("No autorizado");

    const transferId = uuid()
    const qrCode = await QRCode.toDataURL(JSON.stringify({
        transferId, amount, currency
    }));

    let transfer = await QRTransfer.create({
        amount,
        transferId: transferId,
        qr: qrCode,
        status: CREATED,
        currency,
        recipient: ObjectId(accountDestination._id),
    });

    transfer = transfer.toObject();
    delete transfer.recipient

    return qrCode;
}

const update = async (ownerId, {
    accountOriginId,
    amount,
    currency,
    transferId,
}) => {
    const qrTransfer = await QRTransfer.findOne({
        transferId
    })

    if (!qrTransfer) return Promise.reject("Transferencia no encontrada");

    if (qrTransfer.status !== CREATED) return Promise.reject("Transferencia no disponible");

    const accountOrigin = await AccountService.findAccount({_id: ObjectId(accountOriginId)})

    if (!accountOrigin) return Promise.reject("Cuenta origen no econtrada");

    const accountDestination = await AccountService.findAccount({_id: ObjectId(qrTransfer.recipient)});

    if (accountDestination.number === accountOrigin.number) {
        return Promise.reject("No puede transferir a la misma cuenta");
    }

    const transfer = await TransferService.depositToAccount({
        currency, amount, accountOrigin, accountDestination
    })

    qrTransfer.status = DONE;
    await qrTransfer.save();

    return transfer;
}

module.exports = {
    create,
    update
}