const express = require('express');
const router = express.Router();

const { getUsers } = require('../controllers/users');

router.route('/')
.get(async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
})

module.exports = router;