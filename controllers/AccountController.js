const {convertToResponse} = require("../utils/ResponseHelper");
const AccountService = require("../services/AccountService");

const list = async (req, res) => {
    const userId = res.locals.userId;
    console.log("User is " + userId)
    const accounts = await AccountService.getUserAccounts(userId);
    convertToResponse(res, accounts);
}

const create = async (req, res) => {

}


module.exports = {
    list,
    create
}