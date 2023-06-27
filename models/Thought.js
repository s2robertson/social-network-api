const { Schema } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: [true, 'thoughtText is required'],
        minLength: [1, 'thoughtText must be between 1 and 280 characters (currently {VALUE})'],
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get(val) {
            return val.toLocaleString();
        }
    },
    username: {
        type: String,
        required: true
    }
});

module.exports = thoughtSchema;