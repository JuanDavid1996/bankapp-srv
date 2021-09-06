const sameKey = (a, b) => (String(a) === String(b));

const nullOrUndefined = (val) => (val === null || val === undefined);

const isMongoKey = (input) => (/^[0-9a-fA-F]{24}$/.test(input))

const isNumber = (input) => (/^[+-]?\d+(\.\d+)?$/.test(input))

function hasNumbers(t) {
    const regex = /\d/g;
    return regex.test(t);
}

module.exports = {
    sameKey,
    nullOrUndefined,
    isMongoKey,
    hasNumbers,
    isNumber
}