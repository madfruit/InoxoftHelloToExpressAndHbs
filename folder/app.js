const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config();

const { PORT, DB_CONNECTION_STRING } = require('./configs/configs');
const { statusCodes } = require('./configs');

mongoose.connect(DB_CONNECTION_STRING);

const app = express();
const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));

const { booksRouter, userRouter, authRouter } = require('./routers');

app.use('/users', userRouter);
app.use('/books', booksRouter);
app.use('/auth', authRouter);
app.use(_mainErrorHandler);

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res.status(err.status || statusCodes.INTERNAL_SERVER_ERROR)
        .json({
            message: err.message || 'Unknown error'
        });
}

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});
