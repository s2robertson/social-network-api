const { Thought, User } = require('../models');

module.exports = {
    getThoughts() {
        return Thought.find()
            .select('-__v')
            .lean();
    },

    getThoughtById(id) {
        return Thought.findById(id)
            .select('-__v')
            .lean();
    },

    async createThought(thoughtData) {
        const thought = await Thought.create(thoughtData);
        await User.updateOne({ username: thoughtData.username },
            { $addToSet: { thoughts: thought.id } });
        return thought
    },

    updateThought(id, thoughtText) {
        return Thought.findByIdAndUpdate(id, { thoughtText }, { new: true })
            .select('-__v')
            .lean();
    },

    async deleteThought(id) {
        const thought = await Thought.findByIdAndDelete(id, { new: true });
        if (thought) {
            await User.updateOne({ username: thought.username },
                { $pull: { thoughts: thought.id } });
        }
        return thought;
    },

    addReaction(thoughtId, reactionData) {
        return Thought.findByIdAndUpdate(thoughtId, 
            { $addToSet: { reactions: reactionData } },
            { new: true });
    },

    deleteReaction(thoughtId, reactionId) {
        return Thought.findByIdAndUpdate(thoughtId,
            { $pull: { reactions: { reactionId } }},
            { new: true });
    }
}