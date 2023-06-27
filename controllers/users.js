const { User } = require('../models');

module.exports = {
    getUsers() {
        return User.find()
            .select('-__v')
            .lean();
    },

    getUserById(id) {
        return User.findById(id)
            .select('-__v')
            .populate('friends', '-__v')
            .lean();
    },

    createUser(userData) {
        return User.create(userData);
    },

    updateUser(id, newUserData) {
        return User.findByIdAndUpdate(id, newUserData, { new: true })
            .select('-__v')
            .lean();
    }
}