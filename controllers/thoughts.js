const { Thought } = require('../models');

module.exports = {
    getThoughts() {
        return Thought.find()
            .select('-__v')
            .lean();
    }
}