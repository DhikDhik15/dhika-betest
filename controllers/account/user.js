'use strict';

const User = require('../../middleware/user');

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

        res.status(200).json({
            status: true,
            message: 'registration successfully',
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