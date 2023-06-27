const { Error: { ValidationError, CastError }, mongo: { MongoServerError } } = require('mongoose');

module.exports = function(err) {
    if (err instanceof ValidationError) {
        const errorMessages = Object.values(err.errors).map(curr => curr.message);
        return errorMessages.join(', ');
    } else if (err instanceof CastError) {
        return `${err.stringValue} could not be cast to ${err.kind}`;
    } else if (err instanceof MongoServerError && err.code == 11000) {
        return Object.keys(err.keyValue).map(curr => `${curr} (${err.keyValue[curr]}) must be unique`);
    }
    return 'Something went wrong, and the error couldn\'t be parsed';
}