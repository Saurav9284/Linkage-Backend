const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v); 
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); 
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(v); 
            },
            message: props => `Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one digit, and one special character`
        }
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
