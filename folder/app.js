const express = require("express");
const expressHbs = require("express-handlebars");
const path = require("path");
const fs = require("fs");
const util = require("util");

const writeFilePromisified = util.promisify(fs.writeFile);

const { PORT } = require("./configs/config");

const app = express();
const staticPath = path.join(__dirname, 'static');
const databasePath = path.join(__dirname, "database/users.json");
const users = require(databasePath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', staticPath);

app.get('/', (req, res) => {
    res.redirect('/auth');
});

app.get('/auth', (req, res) => {
    res.render('login');
});

app.post('/auth', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);

    if (!user) {
        res.redirect('/register');
        return;
    }
    if (password !== user.password) {
        res.status(403).end('Access denied, wrong password');
    }
    res.redirect(`users/${user.email}`);
});

app.get('/users/:user_email', (req, res) => {
    const { user_email } = req.params;
    const user = users.find(user => user.email == user_email);
    res.render('user', { user });
});

app.get('/users', (req, res) => {
    res.render('users', { users });
});

app.get('/register', (req, res) => {
    res.render('register')
});

app.post('/register', (req, res) => {
    const user = req.body;
    const userByEmail = users.find(u => u.email == user.email);
    if (userByEmail) {
        res.end('Email is already in use');
        return;
    }
    users.push(user);
    writeFilePromisified(databasePath, JSON.stringify(users)).then(() => {
        res.redirect('/auth');
    });
});

app.listen(PORT, () => {
    console.log("listening on port", PORT);
});
