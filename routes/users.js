const express = require('express');
const router = express.Router();

const { getUsers, getUserById, createUser, updateUser, addFriend, removeFriend } = require('../controllers/users');
const getErrorMessage = require('../util/errorMessage');

router.route('/')
.get(async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: getErrorMessage(err) });
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
            res.status(404).json({ message: `Invalid User Id (${req.params.id})` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: getErrorMessage(err) });
    }
})
.put(async (req, res) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: `Invalid User Id (${req.params.id})` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: getErrorMessage(err) });
    }
})

router.route('/:userId/friends/:friendId')
.post(async (req, res) => {
    try {
        const user = await addFriend(req.params.userId, req.params.friendId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: `Invalid User Id (${req.params.userId})` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: getErrorMessage(err) });
    }
})
.delete(async (req, res) => {
    try {
        const user = await removeFriend(req.params.userId, req.params.friendId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: `Invalid User Id (${req.params.userId})` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: getErrorMessage(err) });
    }
})

module.exports = router;