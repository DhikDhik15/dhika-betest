const express = require('express');
const app = express();

module.exports = function (app) {
    const account = require('../controllers/account/account');

    app.route('/register').post(account.createAccount);
    app.route('/login').get(account.login);

}