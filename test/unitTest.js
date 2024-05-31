'use strict';
const Account = require('../middleware/account');

function lastLogin() {
    const threeDaysAgo = moment().subtract(3, 'days').toDate();
    try {
        const last = Account.getLastLogin(threeDaysAgo);
        res.status(200).json({
            status: true,
            data: last,
        })
    } catch (error) {
        res.status(500).json({
            error: error,
            status: false
        })
    }
}

module.exports = {
    lastLogin
};