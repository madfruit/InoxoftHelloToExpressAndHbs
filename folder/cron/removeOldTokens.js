const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const { OAuth, ActionToken } = require('../database');
const { constants } = require('../configs');

module.exports = async () => {
    const previousMonth = dayjs.utc(constants.CURRENT_DATE.toString()).subtract(1, 'month');
    await OAuth.deleteMany({ createdAt: { $lte: previousMonth } });
    await ActionToken.deleteMany({ createdAt: { $lte: previousMonth } });
};
