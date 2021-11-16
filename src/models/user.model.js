const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 6,
        max: 255
    },
    gender: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date
    },
    hash: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 6,
        max: 1024
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;