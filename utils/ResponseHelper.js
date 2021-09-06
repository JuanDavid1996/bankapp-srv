const convertToResponse = (res, data) => {
    res.send({
        success: true,
        data: data,
        errors: []
    });
}

const convertToError = (res, err) => {
    res.send({
        success: false,
        errors: Array.isArray(err) ? err : [err]
    });
}

module.exports = {
    convertToResponse,
    convertToError,
}
