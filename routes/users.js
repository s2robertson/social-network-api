const express = require('express');
const router = express.Router();

const { getUsers, getUserById, createUser } = require('../controllers/users');
const getErrorMessage = require('../util/errorMessage');

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
.post(async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: getErrorMessage(err) });
    }
})

router.route('/:id')
.get(async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Invalid User Id' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
})

module.exports = router;