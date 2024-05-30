'use strict';
const Account = require('../models/account');

exports.getAccount = async () => {
    const account = await Account.find();
    return account;
}
exports.createAccount = async add => {
    const newAccount = await Account.create(add);
    return newAccount
}

exports.findAccount = async name => {
    const account = await Account.findOne({
        userName: name
    });
    return account;
}

exports.getUserAccount = async id => {
    const users = await Account.findById(id).populate({
        path: "userId",
        select: 'userName fullName accountNumber emailAddress registrationNumber'
    });
    return users;
}