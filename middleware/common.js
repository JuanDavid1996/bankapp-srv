const Hasher = require("../utils/Hasher");
const {convertToError} = require("../utils/ResponseHelper");
const {getPathParameter} = require("../utils/RequestHelpers");

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({
            success: false,
            error: "Inicia sesion"
        });
    }

    try {
        console.time("DECODE TOKEN TIME")
        const userData = Hasher.verify(token)
        console.timeEnd("DECODE TOKEN TIME")
        res.locals.userId = userData.user.userId;
        next();
    } catch (e) {
        convertToError(res, e)
    }
}

const checkPathParamUserId = async (req, res, next) => {
    const userId = getPathParameter(req, "userId");
    if (userId !== res.locals.userId) {
        return convertToError(res, "No autorizado");
    }
    next();
}


module.exports = {
    authenticate,
    checkPathParamUserId
}