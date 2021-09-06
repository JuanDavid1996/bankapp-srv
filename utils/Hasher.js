const jwt = require("jsonwebtoken");

const KEY = "¡¡KEY!!";

const generateToken = (user) => {
    return jwt.sign({user}, KEY, {expiresIn: "7d"});
}

const verify = (token) => {
    return jwt.verify(token, KEY);
}

module.exports = {
    generateToken,
    verify
}