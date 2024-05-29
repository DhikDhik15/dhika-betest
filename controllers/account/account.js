'use strict';

const Account = require('../../middleware/account');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createAccount = async (req, res) => {
    try {
        const add = {
            userName : req.body.name,
            password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        }

        const create = await Account.createAccount({
            ...add
        });

        const token = jwt.sign({
            userId: create._id, add
        }, process.env.TOKEN, {
            expiresIn: "1d"
        });

        create.token = token;

        res.status(200).json({
            status: true,
            message: 'registration successfully',
            data: create,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error,
            status: false,
        })
    }
}

exports.login = async (req, res) => {
    const login = {
        userName : req.body.name,
        password : req.body.password,
    }

    const user = await Account.findAccount(
        login.userName
    );

    if (bcrypt.compareSync(user.password, bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)))) {

        /*Create token*/
        const token = jwt.sign({
            userId: user._id, login
        }, process.env.TOKEN, {
            algorithm: "HS256",
            expiresIn: "2d"
        });

        /*Create refresh token*/
        const refreshToken = jwt.sign({
            userId: user._id, login
        }, process.env.REFRESH_TOKEN,{
            algorithm: "HS256",
            expiresIn: "2d"
        })

        /*Save refersh token*/
        user.refreshToken= refreshToken;
        
        /*Save Token*/
        user.token = token;
        res.status(201).json({
            message: 'Login successfully',
            user,
        });
        res.send()
    } else {
        res.status(401).json({
            message: 'Forbidden login !!!'
        });
    }
}