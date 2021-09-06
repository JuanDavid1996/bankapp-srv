const Joi = require("joi");
const Constants = require("../models/constants/ModelContants");
const {convertToError} = require("../utils/ResponseHelper");
const {isMongoKey} = require("../utils/common");

const transferValidation = Joi.object({
    accountDestinationNumber: Joi.number()
        .min(Constants.AccountNumberSize.MIN_SIZE)
        .max(Constants.AccountNumberSize.MAX_SIZE)
        .required(),
    accountDestinationType: Joi.string()
        .valid(Constants.AccountTypeSaving, Constants.AccountTypeCurrent)
        .required(),
    currency: Joi.string()
        .valid(Constants.COP, Constants.USD)
        .required(),
    amount: Joi.number()
        .min(0.1)
        .required(),
    accountOriginId: Joi.string()
        .custom((value, helper) => {
            if (!isMongoKey(value)) {
                return helper.message("Id de cuenta origen no válido")
            }
            return true;
        })
        .required()
});

const create = async (req, res, next) => {
    try {
        await transferValidation.validateAsync(req.body);
        return next();
    } catch (e) {
        console.log("Error at validation ", e);
        convertToError(res, e.details.map(e => e.message + ", "));
    }
}

module.exports = {
    create
}