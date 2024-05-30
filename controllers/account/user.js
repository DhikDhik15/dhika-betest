'use strict';

const User = require('../../middleware/user');
const client = require('../../config-redis');

exports.createUser = async (req, res) => {
    try {
        const add = {
            fullName : req.body.fullname,
            accountNumber: req.body.account_number,
            emailAddress: req.body.email,
            registrationNumber: req.body.registration_number
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