const {Types: {ObjectId}} = require("mongoose");
const AccountService = require("./AccountService");
const EnrolledAccount = require("../models/EnrolledAccount")

const getUserEnrolledAccount = async (ownerId) => {
    return EnrolledAccount.find({
        owner: ObjectId(ownerId)
    }, {account: 0});
}

const create = async (ownerId, {accountNumber, accountType, name}) => {
    console.log("Account number ", accountNumber)
    console.log("Type ", accountType)
    const account = await AccountService.findAccount({number: accountNumber, type: accountType})
    console.log("Account is ", account);
    if (!account) return Promise.reject("Cuenta no encontrada");

    const enrolledAccount = await EnrolledAccount.findOne({
        owner: ObjectId(ownerId),
        accountType,
        accountNumber,
    });

    if (enrolledAccount) return Promise.reject("La cuenta ya fue inscrita anteriormente");

    let newEnrolledAccount = await EnrolledAccount.create({
        name,
        accountType,
        accountNumber,
        owner: ObjectId(ownerId),
        account: ObjectId(account._id)
    });

    newEnrolledAccount = newEnrolledAccount.toObject();
    delete newEnrolledAccount.account;
    return newEnrolledAccount;
}


module.exports = {
    getUserEnrolledAccount,
    create
}