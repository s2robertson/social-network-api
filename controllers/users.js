const { User, Thought } = require('../models');

module.exports = {
    getUsers() {
        return User.find()
            .select('-__v')
            .lean();
    },

    getUserById(id) {
        return User.findById(id)
            .select('-__v')
            .populate('thoughts', '-__v')
            .populate('friends', '-__v')
            .lean();
    },

    createUser(userData) {
        return User.create(userData);
    },

    async updateUser(id, newUserData) {
        const user = await User.findById(id);
        if (newUserData.username) {
            user.username = newUserData.username;
        }
        if (newUserData.email) {
            user.email = newUserData.email;
        }
        const usernameModified = user.isModified('username');
        await user.save();
        if (usernameModified) {
            await Thought.updateMany({ _id: { $in: user.thoughts } },
                { $set: { username: newUserData.username }});
        }
        return user;
    },

    async deleteUser(id) {
        const user = await User.findByIdAndDelete(id);
        if (user) {
            await Thought.deleteMany({ username: user.username });
        }
        return user;
    },

    addFriend(userId, friendId) {
        return User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true })
            .select('-__v')
            .lean();
    },

    removeFriend(userId, friendId) {
        return User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true })
            .select('-__v')
            .lean();
    }
}