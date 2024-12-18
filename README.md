# Jira-Rest-Mock-Server

This is a simple Express application that provides a "search" route. The application reads data from a JSON file and allows for a configurable response delay.

This mock server tries to mimic the routes and responses of [Jira 9.4.5](https://docs.atlassian.com/software/jira/docs/api/REST/9.4.5/)

## Project Structure

```none
my-express-app
├── src
│   ├── app.ts            # Entry point of the application
│   ├── routes
│   │   └── search.ts     # Defines the "search" route
│   └── responses
│       └── search
│           └── search.json # JSON data for the search response
├── package.json          # npm configuration file
├── tsconfig.json         # TypeScript configuration file
└── README.md             # Project documentation
```

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd my-express-app
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

To start the application, run:

```bash
npm start
```

The application will be available at [https://127.0.0.1:6443](https://127.0.0.1:6443).

Start getting a fake issue using [https://127.0.0.1:6443/rest/api/v2/issue/SAMPLE-12345](https://127.0.0.1:6443/rest/api/v2/issue/SAMPLE-12345)

## API Endpoint

### GET /search

This endpoint returns the content of `search.json`. You can set a response delay using the `delay` body parameter (in milliseconds).

**Example:**

```
http://localhost:3000/search
{
   "delay": 1000,
}
```

This will delay the response by 1000 milliseconds.

### GET /issue

-   `/issue` returns the contents of the file issue.json
-   `/random` returns a faked issue id
-   `/ABC-:key` returns a faked issue with the specific id

## Routes

Routes are described in OpenAPI v3 file (./openapi.yaml)

## Nodemon

In order to restart the server on every file changed, use nodemon.

Usage:

```bash
npm run nodemon
```

## License

This project is licensed under the MIT License.
