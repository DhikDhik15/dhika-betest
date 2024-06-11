'use strict';

const Account = require('../../middleware/account');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const client = require('../../config-redis');
const { createSecretToken } = require('../../generateToken');
const moment = require('moment');

exports.createAccount = async (req, res) => {
    try { 
        const salt = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        const newUser = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        };

        const oldUser = await Account.findAccount(newUser.email);

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        const user = await Account.createAccount({
            ...newUser
        });
        const token = createSecretToken(user._id);

        res.cookie("token", token, {
            path: "/", // Cookie is accessible from all paths
            expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
            secure: true, // Cookie will only be sent over HTTPS
            httpOnly: true, // Cookie cannot be accessed via client-side scripts
            sameSite: "None",
        });

        console.log("cookie set succesfully");

        res.json(user);
    } catch (error) {
        console.log("Gott an error", error);
    }
}

exports.login = async (req, res) => {
    const login = {
        email : req.body.email,
        password : req.body.password,
    }

    const user = await Account.findAccount(
        login.email
    );

    if (!(user && (await bcrypt.compareSync(login.password, user.password)))) {
        return res.status(404).json({ message: "Invalid credentials" });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
        domain: process.env.frontend_url, // Set your domain here
        path: "/", // Cookie is accessible from all paths
        expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
        secure: true, // Cookie will only be sent over HTTPS
        httpOnly: true, // Cookie cannot be accessed via client-side scripts
        sameSite: "None",
    });

    res.json({ token });
}

exports.userAccount = async (req, res) => {
    try {
        const Users = await Account.getUserAccount(req.params.id);
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

exports.userKey = async (req, res, next) => {
    const key = req.params.key;
    try {
        const cachedData = await client.get(key);
        if (cachedData) {
            return res.send(cachedData);
        }
        // Set data in cache with expiry
        client.setex(key, 60, cachedData); // Cache for 60 seconds
    } catch (error) {
        res.status(500).json({
            error: error,
            status: false
        })
    }
}

exports.lastLogin = async (req, res) => {
    // Mencari pengguna yang last login 3 hari yang lalu
    const threeDaysAgo = moment().subtract(3, 'days').toDate();
    try {
        const last = await Account.getLastLogin(threeDaysAgo);
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