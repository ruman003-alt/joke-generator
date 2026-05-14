const axios = require('axios');
const jokeService = require('../src/services/jokeService');

jest.mock('axios');

describe('Joke Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchRandomJoke', () => {
    it('should fetch a random joke successfully', async () => {
      const mockJoke = {
        joke: 'Why do programmers prefer dark mode?',
        type: 'single'
      };

      axios.get.mockResolvedValueOnce({ data: mockJoke });

      const result = await jokeService.fetchRandomJoke();

      expect(result).toHaveProperty('joke');
      expect(result).toHaveProperty('source');
    });

    it('should handle twopart jokes', async () => {
      const mockJoke = {
        setup: 'Why do programmers prefer dark mode?',
        delivery: 'Because light attracts bugs!',
        type: 'twopart'
      };

      axios.get.mockResolvedValueOnce({ data: mockJoke });

      const result = await jokeService.fetchRandomJoke();

      expect(result.joke).toContain('Why do programmers');
      expect(result.type).toBe('two-part');
    });

    it('should handle API errors gracefully', async () => {
      axios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(jokeService.fetchRandomJoke()).rejects.toThrow();
    });
  });

  describe('fetchJokeByType', () => {
    it('should fetch a programming joke', async () => {
      const mockJoke = {
        joke: 'Why do Java developers wear glasses?',
        type: 'single'
      };

      axios.get.mockResolvedValueOnce({ data: mockJoke });

      const result = await jokeService.fetchJokeByType('programming');

      expect(result.type).toBe('programming');
      expect(result).toHaveProperty('joke');
    });

    it('should throw error for invalid type', async () => {
      await expect(jokeService.fetchJokeByType('invalid')).rejects.toThrow();
    });
  });

  describe('fetchMultipleJokes', () => {
    it('should fetch multiple jokes', async () => {
      const mockJoke = {
        joke: 'Test joke',
        type: 'single'
      };

      axios.get.mockResolvedValue({ data: mockJoke });

      const result = await jokeService.fetchMultipleJokes(3);

      expect(result).toHaveLength(3);
      expect(axios.get).toHaveBeenCalledTimes(3);
    });
  });
});
