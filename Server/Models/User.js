const { Schema, model } = require('mongoose')
const Bcrypt = require('bcrypt')
const Order = require('./Order')

const UserSchema = new Schema({
    FirstName: {
        type: String,
        required: true,
        trim: true,
    },
    LastName: {
        type: String,
        required: true,
        trim: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
        minLength: 5,
    },
    Orders: [Order.Schema],
});

// Configure Pre-Save Middleware To Create Password
UserSchema.pre('save', async function(Next) {
    if (this.isNew || this.isModified('Password')) {
        const SaltRounds = 10;
        this.Password = await Bcrypt.hash(this.Password, SaltRounds);
    }
    Next();
});

// Compare Inputted Password With The Hashed Password
UserSchema.methods.IsCorrectPassword = async function(Password) {
    return await Bcrypt.compare(Password, this.Password);
};

const User = model('User', UserSchema);

module.exports = User