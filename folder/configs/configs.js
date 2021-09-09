module.exports = {
    PORT: process.env.PORT || 5000,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/inoxoft',

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'some_secret_word',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'another_secret_word',
    RESET_TOKEN_SECRET: process.env.RESET_TOKEN_SECRET || 'reset_secret_word',
    ADMIN_TOKEN_SECRET: process.env.ADMIN_TOKEN_SECRET || 'admin_secret_word',

    EMAIL_BROADCAST: process.env.EMAIL_BROADCAST || 'test@gmail.com',
    EMAIL_BROADCAST_PASS: process.env.EMAIL_BROADCAST_PASS || '12345',

    FRONTEND_URL: process.env.FRONTEND_URL || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
};
