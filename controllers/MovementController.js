const {convertToError, convertToResponse} = require("../utils/ResponseHelper");
const MovementService = require("../services/MovementService")
const {getPathParameter} = require("../utils/RequestHelpers");

const index = async (req, res) => {
    try {
        const userId = res.locals.userId
        const accountId = getPathParameter(req, "accountId");
        const movements = await MovementService.getUserMovementsByAccountId(userId, accountId)
        convertToResponse(res, movements)
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
    index
}