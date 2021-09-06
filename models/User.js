const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const schema = new mongoose.Schema({
    identification: String,
    username: String,
    firstName: String,
    lastName: String,
    password: String,
});

schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (e) {
        return next(e);
    }
});

schema.methods.validatePassword = async function (data) {
    return bcrypt.compareSync(data, this.password);
}

module.exports = mongoose.model("User", schema);