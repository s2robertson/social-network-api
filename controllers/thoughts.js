const { Thought } = require('../models');

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
    }
}