const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const { PORT } = require('./configs/config');

const app = express();
const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', staticPath);

const { authRouter, userRouter } = require('./routers');

app.use('/', authRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.redirect('/auth');
});

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});
