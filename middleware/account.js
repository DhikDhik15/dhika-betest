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

// $gte =  Operator Greater Than or Equal to, digunakan untuk mencari pengguna yang last login lebih besar dari atau sama dengan 3 hari yang lalu
// $lte =  Operator Less Than or Equal to, digunakan untuk mencari pengguna yang last login kurang dari atau sama dengan hari ini 
exports.getLastLogin = async date => {
    const users = await Account.find({
        updatedAt: {
            $gte: date, $lte: new Date()
        }
    });
    return users;
}