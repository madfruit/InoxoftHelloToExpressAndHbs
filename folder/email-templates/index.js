const { WELCOME, PASSWORD_RESET, GRANT_ADMIN } = require('../configs/emailActions.enum');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome'
    },
    [PASSWORD_RESET]: {
        templateName: 'password_reset',
        subject: 'Reset your password',
    },
    [GRANT_ADMIN]: {
        templateName: 'grant_admin',
        subject: 'You are now admin'
    }
};
