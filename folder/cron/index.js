const cron = require('node-cron');

const removeOldTokens = require('./removeOldTokens');

module.exports = () => {
    cron.schedule('0 5 1 * *', () => {
        console.log('Cron started');
        removeOldTokens();
        console.log('Cron finished');
    });
};
