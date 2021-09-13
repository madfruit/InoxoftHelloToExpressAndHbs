module.exports = {
    CURRENT_DATE: new Date(),
    MIN_DATE: new Date(new Date().getFullYear() - 120, 1, 1),
    MAX_DATE: new Date(new Date().getFullYear() - 6, 1, 1),
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    AUTHORIZATION: 'Authorization',
    API_URL: 'http://localhost:5000',
    MAX_IMAGE_SIZE: 5 * 1024 * 1024,

    PHOTO_MIMETYPES: [
        'image/gif',
        'image/jpeg'
    ]
};
