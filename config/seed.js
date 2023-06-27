require('./connection');

const { User, Thought } = require('../models');
const userData = require('./userData.json');
const thoughtData = require('./thoughtData.json');

const userP = User.deleteMany().then(() => {
    return User.insertMany(userData);
}).then(() => {
    console.log('Seeded users');
});

const thoughtP = Thought.deleteMany().then(() => {
    return Thought.insertMany(thoughtData);
}).then(() => {
    console.log('Seeded thoughts');
});

Promise.all([userP, thoughtP]).then(() => process.exit(0));