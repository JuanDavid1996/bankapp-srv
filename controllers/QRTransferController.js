const {convertToError, convertToResponse} = require("../utils/ResponseHelper");
const QRTransferService = require("../services/QRTransferService")
const {getPathParameter} = require("../utils/RequestHelpers");

const create = async (req, res) => {
    try {
        const userId = res.locals.userId
        const transfer = await QRTransferService.create(userId, req.body)
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

const update = async (req, res) => {
    try {
        const transferId = getPathParameter(req, "transferId")
        const userId = res.locals.userId
        const transfer = await QRTransferService.update(userId, {...req.body, transferId})
        convertToResponse(res, transfer)
    } catch (e) {
        console.log("ERROR AT UPDATE TRANSFER ", e)
        if (e instanceof Error) {
            convertToError(res, e.message);
        } else {
            convertToError(res, e);
        }
    }
}

module.exports = {
    create,
    update
}