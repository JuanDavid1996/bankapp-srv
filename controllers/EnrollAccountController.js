const {convertToResponse, convertToError} = require("../utils/ResponseHelper");
const EnrollAccountService = require("../services/EnrollAccountService");

const index = async (req, res) => {
    const userId = res.locals.userId;
    try {
        const result = await EnrollAccountService.getUserEnrolledAccount(userId);
        return convertToResponse(res, result);
    } catch (e) {
        return convertToError(res, e);
    }
}

const create = async (req, res) => {
    const userId = res.locals.userId;
    try {
        const result = await EnrollAccountService.create(userId, req.body);
        return convertToResponse(res, result);
    } catch (e) {
        return convertToError(res, e);
    }
}

module.exports = {
    index,
    create
}