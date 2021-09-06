const {Types: {ObjectId}} = require("mongoose");
const AccountService = require("./AccountService");
const MovementService = require("./MovementService");
const Transfer = require("../models/Transfer");
const {sameKey} = require("../utils/common");
const {USD, TRM, DISCOUNT_BY_TRANSFER, TOP_UP_BY_TRANSFER} = require("../models/constants/ModelContants");

const create = async (ownerId, {
    accountOriginId,
    amount,
    currency,
    accountDestinationNumber,
    accountDestinationType
}) => {
    const accountOrigin = await AccountService.findAccount({_id: ObjectId(accountOriginId)})

    if (!accountOrigin) return Promise.reject("Cuenta origen no econtrada");

    if (!sameKey(accountOrigin.owner, ownerId)) return Promise.reject("No autorizado");

    console.log("Destination ", accountDestinationNumber, " type ", accountDestinationType)

    const accountDestination = await AccountService.findAccount({
        number: accountDestinationNumber,
        type: accountDestinationType
    });

    if (!accountDestination) return Promise.reject("Cuenta destino no econtrada");

    if (accountDestination.number === accountOrigin.number) {
        return Promise.reject("No puede transferir a la misma cuenta");
    }

    return depositToAccount({currency, amount, accountOrigin, accountDestination});
}

const depositToAccount = async ({currency, amount, accountOrigin, accountDestination}) => {
    let amountToDeposit = parseFloat(currency === USD ? amount * TRM : amount);

    const newBalance = (accountOrigin.balance - amountToDeposit)
    if (newBalance < 0) return Promise.reject("Saldo insuficiente");

    let transfer = await Transfer.create({
        amount,
        trm: TRM,
        currency,
        origin: ObjectId(accountOrigin._id),
        recipient: ObjectId(accountDestination._id),
    });

    await MovementService.create({
        amount,
        amountInCop: amountToDeposit * -1,
        currency,
        description: "ENVÍO DE DINERO A: " + accountDestination.number,
        movement: DISCOUNT_BY_TRANSFER,
        account: accountOrigin._id,
        transfer: transfer._id,
    });

    await MovementService.create({
        amount,
        amountInCop: amountToDeposit,
        currency,
        description: "RECEPCIÓN DE DINERO DE: " + accountOrigin.number,
        movement: TOP_UP_BY_TRANSFER,
        account: accountDestination._id,
        transfer: transfer._id,
    });

    await AccountService.updateAccountBalance({
        accountId: accountOrigin._id,
        amount: (amountToDeposit * -1)
    });

    await AccountService.updateAccountBalance({
        accountId: accountDestination._id,
        amount: amountToDeposit
    })

    transfer = transfer.toObject();
    delete transfer.recipient

    return transfer;
}

module.exports = {
    create,
    depositToAccount,
}