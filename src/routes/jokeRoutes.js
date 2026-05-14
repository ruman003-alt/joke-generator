const express = require('express');
const jokeController = require('../controllers/jokeController');

const router = express.Router();

// Get random joke
router.get('/joke', jokeController.getRandomJoke);

// Get joke by type
router.get('/joke/type/:type', jokeController.getJokeByType);

// Get multiple jokes
router.get('/jokes/:count', jokeController.getMultipleJokes);

module.exports = router;
