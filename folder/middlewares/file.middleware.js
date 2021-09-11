const ErrorHandler = require('../errors/ErrorHandler');
const { constants, statusCodes } = require('../configs');

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            const { avatar } = req.files;
            if (!avatar) {
                next();
            }
            const { name, size, mimetype } = avatar;
            if (size > constants.MAX_IMAGE_SIZE) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, `File ${name} is too big`);
            }

            if (!constants.PHOTO_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, `Wrong file format ${name}`);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
