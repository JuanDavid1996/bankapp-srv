const Joi = require("joi");
const Constants = require("../models/constants/ModelContants");
const {convertToError} = require("../utils/ResponseHelper");
const {isMongoKey, isNumber} = require("../utils/common");
const {getPathParameter} = require("../utils/RequestHelpers");

const qrTransferValidation = Joi.object({
    currency: Joi.string()
        .valid(Constants.COP, Constants.USD)
        .required(),
    amount: Joi.string()
        .custom((value, helper) => {
            if (!isNumber(value)) {
                if (parseFloat(value) < 0) {
                    return helper.message("Monto enviado no válido")
                }
            }
            return true;
        })
        .allow(''),
    accountDestinationId: Joi.string()
        .custom((value, helper) => {
            if (!isMongoKey(value)) {
                return helper.message("Id de cuenta destino no válida")
            }
            return true;
        })
        .required()
});

const updateTransferValidation = Joi.object({
    currency: Joi.string()
        .valid(Constants.COP, Constants.USD)
        .required(),
    amount: Joi.string()
        .custom((value, helper) => {
            if (!isNumber(value)) {
                if (parseFloat(value) < 0) {
                    return helper.message("Monto enviado no válido")
                }
            }
            return true;
        })
        .allow(''),
    accountOriginId: Joi.string()
        .custom((value, helper) => {
            if (!isMongoKey(value)) {
                return helper.message("Id de cuenta de origen no válida")
            }
            return true;
        })
        .required(),
    transferId: Joi.string().uuid().required()
});

const create = async (req, res, next) => {
    try {
        await qrTransferValidation.validateAsync(req.body);
        return next();
    } catch (e) {
        console.log("Error at validation ", e);
        convertToError(res, e.details.map(e => e.message + ", "));
    }
}

const update = async (req, res, next) => {
    try {
        const transferId = getPathParameter(req, "transferId")
        await updateTransferValidation.validateAsync({...req.body, transferId});
        return next();
    } catch (e) {
        console.log("Error at validation ", e);
        convertToError(res, e.details.map(e => e.message + ", "));
    }
}

module.exports = {
    create,
    update
}