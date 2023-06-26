const mongoose = require('mongoose');

const userSchema = require('./User');
const User = mongoose.model('user', userSchema);

module.exports = { User };