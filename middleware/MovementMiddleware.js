const Joi = require("joi");
const {convertToError} = require("../utils/ResponseHelper");
const {isMongoKey} = require("../utils/common");
const {getPathParameter} = require("../utils/RequestHelpers");

const movements = Joi.object({
    accountId: Joi.string()
        .custom((value, helper) => {
            if (!isMongoKey(value)) {
                return helper.message("Id de cuenta no válido")
            }
            return true;
        })
        .required()
});

const index = async (req, res, next) => {
    try {
        await movements.validateAsync({
            accountId: getPathParameter(req, "accountId")
        });
        return next();
    } catch (e) {
        console.log("Error at validation ", e);
        convertToError(res, e.details.map(e => e.message + ", "));
    }
}

module.exports = {
    index
}