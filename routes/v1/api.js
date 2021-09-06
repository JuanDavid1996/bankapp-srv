const express = require('express');
const CommonMiddleware = require("../../middleware/common");

const SessionController = require("../../controllers/SessionController");
const SessionMiddleware = require("../../middleware/SessionMiddleware");

const AccountController = require("../../controllers/AccountController");

const EnrollAccountMiddleware = require("../../middleware/EnrollAccountMiddleware");
const EnrollAccountController = require("../../controllers/EnrollAccountController");

const TransferController = require("../../controllers/TransferController");
const TransferMiddleware = require("../../middleware/TransferMiddleware");

const QRTransferController = require("../../controllers/QRTransferController");
const QRTransferMiddleware = require("../../middleware/QRTransferMiddleware");

const MovementController = require("../../controllers/MovementController");
const MovementMiddleware = require("../../middleware/MovementMiddleware");

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send({
        ping: "pong",
        now: new Date(),
    });
});

const userMiddlewares = [
    CommonMiddleware.authenticate, CommonMiddleware.checkPathParamUserId
];

router.post('/session/signUp', SessionMiddleware.signUp, SessionController.signUp);
router.post('/session/signIn', SessionMiddleware.signIn, SessionController.signIn);
router.get('/accounts/:userId/', userMiddlewares, AccountController.list);
router.post('/accounts/', CommonMiddleware.authenticate, AccountController.create);
router.get('/enrolled_accounts/:userId/', userMiddlewares, EnrollAccountController.index);
router.post('/enrolled_accounts/', CommonMiddleware.authenticate, EnrollAccountMiddleware.create, EnrollAccountController.create);
router.post('/transfers/', CommonMiddleware.authenticate, TransferMiddleware.create, TransferController.create);
router.post('/qr_transfers/', CommonMiddleware.authenticate, QRTransferMiddleware.create, QRTransferController.create);
router.put('/qr_transfers/:transferId', CommonMiddleware.authenticate, QRTransferMiddleware.update, QRTransferController.update);
router.get('/movements/:accountId', CommonMiddleware.authenticate, MovementMiddleware.index, MovementController.index);

module.exports = router;