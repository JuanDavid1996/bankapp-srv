const User = require("../models/User");
const Hasher = require("../utils/Hasher");
const {convertToResponse, convertToError} = require("../utils/ResponseHelper");
const {isAlreadyInUse, createUser} = require("../services/SessionService");
const AccountService = require("../services/AccountService");
const MovementService = require("../services/MovementService");
const {AccountTypeSaving, AccountTypeCurrent, COP, MOVEMENT_DEPOSIT} = require("../models/constants/ModelContants");

const signIn = async (req, res) => {
    const {username, password} = req.body;
    let user = await User.findOne({username});

    if (!user || !await user.validatePassword(password)) {
        return convertToError(res, "Usuario o contraseña errada");
    }

    const token = await Hasher.generateToken({userId: user._id});
    user = user.toObject();
    delete user.password;

    return convertToResponse(res, {
        user,
        token
    })
}

const signUp = async (req, res) => {
    try {
        await isAlreadyInUse(req.body.username)
        const user = await createUser(req.body);
        const savingAccount = await AccountService.createAccount(user, AccountTypeSaving);
        const currentAccount = await AccountService.createAccount(user, AccountTypeCurrent);

        await MovementService.create({
            amount: 1000000,
            amountInCop: 1000000,
            currency: COP,
            account: savingAccount._id,
            description: "CARGA INCIAL",
            movement: MOVEMENT_DEPOSIT
        });

        await MovementService.create({
            amount: 1000000,
            amountInCop: 1000000,
            currency: COP,
            account: currentAccount._id,
            description: "CARGA INCIAL",
            movement: MOVEMENT_DEPOSIT
        });

        await AccountService.updateAccountBalance({
            accountId: savingAccount._id,
            amount: 1000000
        })

        await AccountService.updateAccountBalance({
            accountId: currentAccount._id,
            amount: 1000000
        })

        return convertToResponse(res, {user});
    } catch (e) {
        convertToError(res, e);
    }
}

module.exports = {
    signIn,
    signUp
}