const axios = require('axios');

const APIs = {
  jokeapi: 'https://jokeapi.dev/joke/Any',
  official: 'https://official-joke-api.appspot.com/random_joke',
  randomjoke: 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous'
};

const jokeService = {
  fetchRandomJoke: async () => {
    try {
      // Try JokeAPI first
      const response = await axios.get(APIs.jokeapi, {
        timeout: 5000
      });

      if (response.data.type === 'twopart') {
        return {
          joke: `${response.data.setup} ${response.data.delivery}`,
          type: 'two-part',
          source: 'JokeAPI'
        };
      }

      return {
        joke: response.data.joke,
        type: 'single',
        source: 'JokeAPI'
      };
    } catch (error) {
      // Fallback to Official Joke API
      try {
        const response = await axios.get(APIs.official, {
          timeout: 5000
        });

        return {
          joke: `${response.data.setup} ${response.data.punchline}`,
          type: response.data.type,
          source: 'Official Joke API'
        };
      } catch (fallbackError) {
        throw new Error('Failed to fetch joke from all available APIs');
      }
    }
  },

  fetchJokeByType: async (type) => {
    try {
      let apiUrl;

      switch (type) {
        case 'programming':
          apiUrl = 'https://jokeapi.dev/joke/Programming';
          break;
        case 'general':
          apiUrl = 'https://official-joke-api.appspot.com/random_joke';
          break;
        case 'knock-knock':
          apiUrl = 'https://jokeapi.dev/joke/Knock-Knock';
          break;
        default:
          throw new Error('Invalid joke type');
      }

      const response = await axios.get(apiUrl, {
        timeout: 5000
      });

      if (response.data.type === 'twopart') {
        return {
          joke: `${response.data.setup} ${response.data.delivery}`,
          type: type,
          source: 'JokeAPI'
        };
      }

      return {
        joke: response.data.joke || `${response.data.setup} ${response.data.punchline}`,
        type: type,
        source: 'JokeAPI'
      };
    } catch (error) {
      throw new Error(`Failed to fetch ${type} joke: ${error.message}`);
    }
  },

  fetchMultipleJokes: async (count) => {
    const jokes = [];

    for (let i = 0; i < count; i++) {
      try {
        const joke = await jokeService.fetchRandomJoke();
        jokes.push(joke);
      } catch (error) {
        console.error(`Error fetching joke ${i + 1}:`, error.message);
      }
    }

    return jokes;
  }
};

module.exports = jokeService;
