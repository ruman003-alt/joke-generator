# Joke Generator

A simple Node.js application that generates random jokes using external APIs.

## Features

- Fetch random jokes from multiple sources
- Support for different joke types (programming, general, knock-knock)
- Express.js REST API endpoints
- Error handling and validation
- Response caching (optional)

## Setup

### Installation

```bash
npm install
```

### Running the Application

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Get Random Joke

```
GET /api/joke
GET /api/joke?type=programming
GET /api/joke?type=general
```

**Response:**

```json
{
  "joke": "Why do programmers prefer dark mode? Because light attracts bugs!",
  "type": "programming",
  "source": "JokeAPI"
}
```

## Supported Joke Types

- `general` - General jokes
- `programming` - Programming/tech jokes
- `knock-knock` - Knock-knock jokes

## External APIs Used

1. **JokeAPI** - https://jokeapi.dev/
2. **Official Joke API** - https://official-joke-api.appspot.com/
3. **Random Joke API** - https://random-joke-api.herokuapp.com/

## Project Structure

```
joke-generator/
├── src/
│   ├── index.js
│   ├── controllers/
│   │   └── jokeController.js
│   ├── services/
│   │   └── jokeService.js
│   ├── routes/
│   │   └── jokeRoutes.js
│   └── utils/
│       └── errorHandler.js
├── tests/
│   └── joke.test.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## License

MIT
