//
//
//Request Helpers
//
//

const getUserId = (res) => (res.locals.userId);

const getQueryParameter = (req, parameterName, defaultValue = null) => (
    req.query[parameterName] || defaultValue
)

const getQueryParameters = (req, parameterNames, defaultValues = []) => {
    let output = {};
    for (let [parameterName, index] of Object.entries(req.query)) {
        output[parameterName] = getQueryParameter(req, parameterName, defaultValues[index]);
    }
    return output;
}

const getPathParameter = (req, parameterName, defaultValue = null) => (
    req.params[parameterName] || defaultValue
)

const getDateRangeAndSort = (req) => {
    const from = getQueryParameter(req, "from")
    const to = getQueryParameter(req, "to")
    const sort = getQueryParameter(req, "sort") || "desc";
    return {from, to, sort};
}

const getAllParams = (req) => ({
    ...req.params,
    ...req.body
})

const getDateRange = (req) => {
    const from = getQueryParameter(req, "from")
    const to = getQueryParameter(req, "to")
    return {from, to};
}

module.exports = {
    getUserId,
    getQueryParameter,
    getPathParameter,
    getDateRangeAndSort,
    getQueryParameters,
    getAllParams,
    getDateRange,
}