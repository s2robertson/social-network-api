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
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
}, {
    toJSON: {
        versionKey: false
    }
});

module.exports = userSchema;