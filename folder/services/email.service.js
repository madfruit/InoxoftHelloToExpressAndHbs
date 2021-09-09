const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const templatesInfo = require('../email-templates');
const ErrorHandler = require('../errors/ErrorHandler');

const { configs, statusCodes } = require('../configs');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: configs.EMAIL_BROADCAST,
        pass: configs.EMAIL_BROADCAST_PASS
    }
});

const sendMail = async (userMail, emailAction, context) => {
    const templateToSend = templatesInfo[emailAction];
    if (!templateToSend) {
        throw new ErrorHandler(statusCodes.BAD_REQUEST, 'Wrong template name');
    }
    context = { ...context, frontendURL: configs.FRONTEND_URL };
    const { templateName, subject } = templateToSend;

    const html = await templateParser.render(templateName, context);
    return transporter.sendMail({
        from: 'No reply',
        to: 'madfruitbest@gmail.com',
        subject,
        html
    });
};

module.exports = {
    sendMail
};
