'use strict';
const User = require('../models/user');

exports.getUser = async () => {
    const user = await User.find();
    return user;
}
exports.createUser = async add => {
    const newUser = await User.create(add);
    return newUser
}

exports.findUser = async name => {
    const User = await User.findOne({
        userName: name
    });
    return User;
}