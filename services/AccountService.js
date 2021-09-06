const {Types: {ObjectId}} = require("mongoose");
const Account = require("../models/Account");
const Constants = require("../models/constants/ModelContants");

const generateRandomAccountNumber = () => {
    const {MAX_SIZE, MIN_SIZE} = Constants.AccountNumberSize
    return parseInt(Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE);
}

const existsAccountNumber = (number, accountType) => (Account.exists({number, type: accountType}))

const generateAccountNumber = async (accountType) => {
    return new Promise(async (resolve) => {
        let accountNumber = generateRandomAccountNumber();
        let exists = await existsAccountNumber(accountNumber, accountType);
        if (!exists) return resolve(accountNumber);
        while (exists) {
            accountNumber = generateRandomAccountNumber();
            exists = await existsAccountNumber(accountNumber, accountType);
        }
        return resolve(accountNumber);
    })
}

const createAccount = async (owner, accountType) => {
    const accountNumber = await generateAccountNumber(accountType);
    return Account.create({
        number: accountNumber,
        balance: 0,
        owner: ObjectId(owner._id),
        type: accountType
    })
}

const getUserAccounts = async (ownerId) => {
    return Account.find({
        owner: ObjectId(ownerId)
    });
}

function findAccount(param) {
    return Account.findOne(param);
}

function updateAccountBalance({accountId, amount}) {
    return Account.findOneAndUpdate({
        _id: ObjectId(accountId),
    }, {$inc: {balance: amount}})
}

module.exports = {
    createAccount,
    getUserAccounts,
    findAccount,
    updateAccountBalance
}