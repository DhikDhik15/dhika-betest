const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
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
        type: mongoose.Schema.Types.ObjectId
    }
},{
    timestamps: true
});
const account = mongoose.model("account", accountSchema);
module.exports = account;