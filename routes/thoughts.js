const express = require('express');
const router = express.Router();

const { getThoughts } = require('../controllers/thoughts');
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

module.exports = router;