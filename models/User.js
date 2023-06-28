const { Schema } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
}, {
    virtuals: {
        friendCount: {
            get() {
                return this.friends.length;
            }
        }
    },
    toJSON: {
        versionKey: false,
        virtuals: true
    }
});

module.exports = userSchema;