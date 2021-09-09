const { WELCOME, PASSWORD_RESET } = require('../configs/emailActions.enum');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome'
    },
    [PASSWORD_RESET]: {
        templateName: 'password_reset',
        subject: 'Reset your password',
    }
};
