const { User } = require('../models');

module.exports = {
    getUsers() {
        return User.find().select('-__v');
    },

    getUserById(id) {
        return User.findById(id).select('-__v').populate('friends', '-__v');
    }
}