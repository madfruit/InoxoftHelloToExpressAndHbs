const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
require('dotenv').config();
const cronJobs = require('./cron');
const { statusCodes, configs } = require('./configs');

mongoose.connect(configs.DB_CONNECTION_STRING);

const app = express();
const staticPath = path.join(__dirname, 'static');

app.use(cors({
    origin: _configureCors
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.use(expressFileUpload());

if (configs.ENV === 'dev') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const morgan = require('morgan');
    app.use(morgan('dev'));
}
app.use(helmet());

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000
}));

const {
    booksRouter,
    userRouter,
    authRouter,
    adminRouter
} = require('./routers');

app.use('/users', userRouter);
app.use('/books', booksRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use(_mainErrorHandler);

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res.status(err.status || statusCodes.INTERNAL_SERVER_ERROR)
        .json({
            message: err.message || 'Unknown error'
        });
}

app.listen(configs.PORT, () => {
    console.log('listening on port', configs.PORT);
    cronJobs();
});

function _configureCors(origin, callback) {
    const whiteList = configs.ALLOWED_ORIGIN.split(';');
    if (!origin) {
        return callback(null, true);
    }
    if (!whiteList.includes(origin)) {
        return callback(new Error('Cors not allowed'), false);
    }
    return callback(null, true);
}
