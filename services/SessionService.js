const User = require("../models/User");

const isAlreadyInUse = async (username) => {
    const user = await User.exists({
        username,
    });

    if (user) {
        return Promise.reject("This username is already in use")
    }

    return Promise.resolve();
}

const createUser = async (data) => {
    const user = (await User.create(data)).toObject();
    delete user.password;
    return user;
}

module.exports = {
    isAlreadyInUse,
    createUser
}