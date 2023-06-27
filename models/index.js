const mongoose = require('mongoose');

const userSchema = require('./User');
const User = mongoose.model('user', userSchema);

const thoughtSchema = require('./Thought');
const Thought = mongoose.model('thought', thoughtSchema);

module.exports = { User, Thought };