require('./connection');

const { User } = require('../models');
const userData = require('./userData.json');

User.deleteMany().then(() => {
    return User.insertMany(userData);
}).then(() => {
    console.log('Seeded users');
    process.exit(0);
})