'use strict';

const User = require('../../middleware/user');
const client = require('../../config-redis');
const { v4: uuidv4 } = require('uuid');

exports.createUser = async (req, res) => {
    try {
        const add = {
            userId: uuidv4(),
            fullName : req.body.fullname,
            accountNumber: req.body.account_number,
            emailAddress: req.body.email,
            registrationNumber: uuidv4()
        }

        const create = await User.createUser({
            ...add
        });

        const key = `user-${create.accountNumber}`
        await client.set(key, JSON.stringify(create));

        res.status(200).json({
            status: true,
            message: 'registration successfully',
            key: `redis key: ${key}`,
            data: create,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error,
            status: false,
        })
    }
}

exports.getAccountNumber = async (req, res) => {
    try {
        const Users = await User.getUserAccountNumber(req.params.accountNumber);
        res.status(200).json({
            status: true,
            data: Users,
        })
    } catch (error) {
        res.status(500).json({
            error: error,
            status: false
        })
    }
}

exports.getRegistrationNumber = async (req, res) => {
    try {
        const Users = await User.getUserRegistrationNumber(req.params.registrationNumber);
        res.status(200).json({
            status: true,
            data: Users,
        })
    } catch (error) {
        res.status(500).json({
            error: error,
            status: false
        })
    }
}