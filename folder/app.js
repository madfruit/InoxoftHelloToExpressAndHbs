const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const { PORT } = require('./configs/config');

mongoose.connect('mongodb://localhost:27017/inoxoft');

const app = express();
const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));

const { carsRouter, userRouter } = require('./routers');

app.use('/users', userRouter);
app.use('/cars', carsRouter);
app.use(_mainErrorHandler);

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Unknown error'
        });
}

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});
