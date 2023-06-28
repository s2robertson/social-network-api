const { User, Thought } = require('../models');

module.exports = {
    getUsers() {
        return User.find();
    },

    getUserById(id) {
        return User.findById(id)
            .populate('thoughts')
            .populate('friends');
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
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
        }
        return user;
    },

    addFriend(userId, friendId) {
        return User.findByIdAndUpdate(userId,
            { $addToSet: { friends: friendId } },
            { new: true });
    },

    removeFriend(userId, friendId) {
        return User.findByIdAndUpdate(userId,
            { $pull: { friends: friendId } },
            { new: true });
    }
}