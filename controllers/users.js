const { User } = require('../models');

module.exports = {
    getUsers() {
        return User.find();
    }
}