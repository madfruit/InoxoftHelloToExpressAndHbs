const ErrorHandler = require('../errors/ErrorHandler');
const statusCodes = require('../configs/statusCodes.enum');

const mongoIdRegex = new RegExp('/^[a-f\\d]{24}$/i');

module.exports = {
    validateMongoId: (id) => {
        if (!id.match(mongoIdRegex)) {
            throw new ErrorHandler(statusCodes.BAD_REQUEST, 'Invalid ObjectId');
        }
    }
};
