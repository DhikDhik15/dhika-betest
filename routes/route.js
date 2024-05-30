const express = require('express');
const app = express();

module.exports = function (app) {
    const account = require('../controllers/account/account');
    const user = require('../controllers/account/user');

    app.route('/account').post(account.createAccount);
    app.route('/login').get(account.login);

    app.route('/register').post(user.createUser);
    app.route('/user-account/:id').get(account.userAccount);

    app.route('/user-key/:key').get(account.userKey);
}