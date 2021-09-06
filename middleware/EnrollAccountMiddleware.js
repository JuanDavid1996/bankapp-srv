const Joi = require("joi");
const Constants = require("../models/constants/ModelContants");
const {convertToError} = require("../utils/ResponseHelper");

const enrollAccountValidation = Joi.object({
    accountNumber: Joi.number()
        .min(Constants.AccountNumberSize.MIN_SIZE)
        .max(Constants.AccountNumberSize.MAX_SIZE)
        .required(),
    accountType: Joi.string()
        .valid(Constants.AccountTypeSaving, Constants.AccountTypeCurrent)
        .required(),
    name: Joi.string()
        .min(3)
        .required()
});

const create = async (req, res, next) => {
    try {
        await enrollAccountValidation.validateAsync(req.body);
        return next();
    } catch (e) {
        console.log("Error at validation ", e);
        convertToError(res, e.details.map(e => e.message + ", "));
    }
}

module.exports = {
    create
}