const {Types: {ObjectId}} = require("mongoose");
const Movement = require("../models/Movement");
const AccountService = require("./AccountService");
const {sameKey} = require("../utils/common");

const create = ({amount, amountInCop, currency, movement, account, transfer, description}) => {
    return Movement.create({
        amount,
        amountInCop,
        currency,
        movement,
        description,
        account: ObjectId(account),
        transfer: transfer && ObjectId(transfer)
    })
}

const getUserMovementsByAccountId = async (ownerId, accountId) => {
    const account = await AccountService.findAccount({
        _id: ObjectId(accountId)
    })

    if (!account) return Promise.reject("Cuenta no econtrada")
    if (!sameKey(account.owner, ownerId)) return Promise.reject("No autorizado")

    return Movement.find({
        account: ObjectId(accountId)
    }).sort({_id: -1})
}

module.exports = {
    create,
    getUserMovementsByAccountId
}