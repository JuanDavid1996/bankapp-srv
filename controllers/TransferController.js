const {convertToError, convertToResponse} = require("../utils/ResponseHelper");
const TransferService = require("../services/TransferService")

const create = async (req, res) => {
    try {
        const userId = res.locals.userId
        const transfer = await TransferService.create(userId, req.body)
        convertToResponse(res, transfer)
    } catch (e) {
        console.log("ERROR AT CREATE TRANSFER ", e)
        if (e instanceof Error) {
            convertToError(res, e.message);
        } else {
            convertToError(res, e);
        }
    }
}

module.exports = {
    create
}