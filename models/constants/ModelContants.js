const AccountTypeSaving = "Saving";
const AccountTypeCurrent = "Current";

const AccountTypes = [AccountTypeSaving, AccountTypeCurrent];

const AccountNumberSize = {
    MAX_SIZE: 99999999999,
    MIN_SIZE: 10000000000,
}

const DONE = "DONE";
const CANCELLED = "CANCELLED"

const TransactionStatuses = [
    DONE,
    CANCELLED
];

const COP = "COP";
const USD = "USD";

const Currencies = [
    COP,
    USD
];

const TRM = 3700;

const MOVEMENT_DEPOSIT = "MOVEMENT_DEPOSIT";
const DISCOUNT_BY_TRANSFER = "DISCOUNT_BY_TRANSFER";
const TOP_UP_BY_TRANSFER = "TOP_UP_BY_TRANSFER";

const MOVEMENT_TYPES = [
    MOVEMENT_DEPOSIT,
    DISCOUNT_BY_TRANSFER,
    TOP_UP_BY_TRANSFER
]

const CREATED = "CREATED"

const QR_TRANSFER_STATUSES = [
    CREATED,
    DONE
]

module.exports = {
    AccountTypes,
    AccountTypeSaving,
    AccountTypeCurrent,
    AccountNumberSize,
    TransactionStatuses,
    Currencies,
    COP,
    USD,
    TRM,
    DONE,
    CANCELLED,
    MOVEMENT_TYPES,
    MOVEMENT_DEPOSIT,
    DISCOUNT_BY_TRANSFER,
    TOP_UP_BY_TRANSFER,
    QR_TRANSFER_STATUSES,
    CREATED,
}