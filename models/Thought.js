const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: [true, 'reactionBody is required'],
        maxLength: [280, 'reactionBody must be between 1 and 280 characters']
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get(val) {
            return val.toLocaleString();
        }
    }
}, {
    _id: false
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: [true, 'thoughtText is required'],
        minLength: [1, 'thoughtText must be between 1 and 280 characters'],
        maxLength: [280, 'thoughtText must be between 1 and 280 characters']
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
    },
    reactions: [reactionSchema]
}, {
    virtuals: {
        reactionCount: {
            get() {
                return this.reactions.length;
            }
        }
    },
    toJSON: {
        versionKey: false
    }
});

module.exports = thoughtSchema;