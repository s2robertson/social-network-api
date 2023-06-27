const express = require('express');
const router = express.Router();

const { getThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../controllers/thoughts');
const getErrorMessage = require('../util/errorMessage');

router.route('/')
.get(async (req, res) => {
    try {
        const thoughts = await getThoughts();
        res.json(thoughts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: getErrorMessage(err) });
    }
})
.post(async (req, res) => {
    try {
        const thought = await createThought(req.body);
        res.status(201).json(thought);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: getErrorMessage(err) });
    }
})

router.route('/:id')
.get(async (req, res) => {
    try {
        const thought = await getThoughtById(req.params.id);
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({ message: `Invalid Thought Id (${req.params.id})` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: getErrorMessage(err) });
    }
})
.put(async (req, res) => {
    try {
        const thought = await updateThought(req.params.id, req.body.thoughtText);
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({ message: `Invalid Thought Id (${req.params.id})` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: getErrorMessage(err) });
    }
})
.delete(async (req, res) => {
    try {
        const thought = await deleteThought(req.params.id);
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({ message: `Invalid Thought Id (${req.params.id})` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: getErrorMessage(err) });
    }
})

router.post('/:thoughtId/reactions/', async (req, res) => {
    try {
        const thought = await addReaction(req.params.thoughtId, req.body);
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({ message: `Invalid Thought Id (${req.params.thoughtId})` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: getErrorMessage(err) });
    }
})

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await deleteReaction(req.params.thoughtId, req.params.reactionId);
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({ message: `Invalid Thought Id (${req.params.thoughtId})` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: getErrorMessage(err) });
    }
})

module.exports = router;