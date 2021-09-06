const Joi = require('joi');

const singInValidation = Joi.object({
    username: Joi.string()
        .min(3)
        .required(),
    password: Joi.string()
        .required()
});

const singUpValidation = Joi.object({
    identification: Joi.string()
        .min(6)
        .required(),
    firstName: Joi.string()
        .min(3)
        .custom((value, helper) => {
            if (hasNumbers(value)) {
                return helper.message("El nombre no debe tener número")
            }
            return true;
        })
        .required(),
    lastName: Joi.string()
        .min(3)
        .custom((value, helper) => {
            if (hasNumbers(value)) {
                return helper.message("Los apelidos no debe tener número")
            }
            return true;
        })
        .required(),
    username: Joi.string()
        .alphanum()
        .min(3)
        .required(),
    password: Joi.string()
        .min(8)
        .required()
});


const {convertToError} = require("../utils/ResponseHelper");
const {isMongoKey, hasNumbers} = require("../utils/common");

const signIn = async (req, res, next) => {
    const {username, password} = req.body;
    try {
        await singInValidation.validateAsync({username, password});
        return next();
    } catch (e) {
        console.log("Error at validation ", e);
        convertToError(res, e.details.map(e => e.message + ", "));
    }
}

const signUp = async (req, res, next) => {
    const {identification, firstName, lastName, username, password} = req.body;
    try {
        await singUpValidation.validateAsync({
            firstName,
            lastName,
            identification,
            username,
            password
        });
        return next();
    } catch (e) {
        console.log("Error at validation ", e);
        convertToError(res, e.details.map(e => e.message + ", "));
    }
}

module.exports = {
    signIn,
    signUp
}