require ('dotenv').config();

const Mongoose = require('mongoose')

Mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/redux-store')

module.exports = Mongoose.connection