'use strict';
const express = require('express');
const app = express();

module.exports = function (app) {
    const account = require('../controllers/account/account');

    app.route('/auth/login').get(account.login);
}