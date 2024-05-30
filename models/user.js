const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String
    },
    emailAddress: {
        type: String,
        unique: true
    },
    registrationNumber: {
        type: String,
        unique: true
    }
},{
    timestamps: true
});
const user = mongoose.model("user", userSchema);
module.exports = user;