const redis = require('redis');
const ErrorHandler = require('../errors/ErrorHandler');

const { constants, statusCodes } = require('../configs');

const redisClient = redis.createClient();

module.exports = {
    setItem: (key, value) => {
        redisClient.setex(key, constants.REDIS_DEFAULT_TTL, JSON.stringify(value));
    },

    deleteItem: (key) => {
        redisClient.del(key, (err, data) => {
            if (data === 1) {
                console.log('Data was removed');
            }
        });
    },

    getOrSetItem: (key, cb) => {
        return new Promise((resolve, reject) => {
            redisClient.get(key, async (err, data) => {
                if (err) {
                    return reject(err);
                }

                if (data) {
                    return resolve(JSON.parse(data));
                }

                const freshData = await cb();

                if (freshData) {
                    redisClient.setex(key, constants.REDIS_DEFAULT_TTL, JSON.stringify(freshData));
                    return resolve(freshData);
                }
                return reject(new ErrorHandler(statusCodes.NOT_FOUND, 'User not found'));
            });
        });
    }
};
