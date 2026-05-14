const jokeService = require('../services/jokeService');

const jokeController = {
  getRandomJoke: async (req, res, next) => {
    try {
      const joke = await jokeService.fetchRandomJoke();
      res.json({
        success: true,
        data: joke
      });
    } catch (error) {
      next(error);
    }
  },

  getJokeByType: async (req, res, next) => {
    try {
      const { type } = req.params;
      const validTypes = ['programming', 'general', 'knock-knock'];

      if (!validTypes.includes(type)) {
        return res.status(400).json({
          success: false,
          error: `Invalid type. Supported types: ${validTypes.join(', ')}`
        });
      }

      const joke = await jokeService.fetchJokeByType(type);
      res.json({
        success: true,
        data: joke
      });
    } catch (error) {
      next(error);
    }
  },

  getMultipleJokes: async (req, res, next) => {
    try {
      const { count } = req.params;
      const jokeCount = parseInt(count);

      if (isNaN(jokeCount) || jokeCount < 1 || jokeCount > 10) {
        return res.status(400).json({
          success: false,
          error: 'Count must be between 1 and 10'
        });
      }

      const jokes = await jokeService.fetchMultipleJokes(jokeCount);
      res.json({
        success: true,
        count: jokes.length,
        data: jokes
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = jokeController;
