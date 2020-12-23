// Import mongoose
const mongoose = require('mongoose');

// (1) Schema
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: false
        },
        photoUrl: {
           type: String 
        },
        dateCreated: {
            type: Date,
            default: Date.now
        }
    }
)

// (2) Model
const UserModel = mongoose.model('users', UserSchema);

// (3) Export
module.exports = UserModel;