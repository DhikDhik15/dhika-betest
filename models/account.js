const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastLoginDateTime: {
        type: Date
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},{
    timestamps: true
});
const account = mongoose.model("account", accountSchema);
module.exports = account;