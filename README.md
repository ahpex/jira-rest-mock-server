# Jira-Rest-Mock-Server

This is a simple JIRA REST mock server intended to be used as a fake server for testing your own tools or automation scripts.

Some examples are:

- Test automation scripts without stressing the real Jira server
- Test scripts reading/writing data to the server
- You don't want to have real names or real issues just for testing
- No need for authorization with a Bearer Token
- Fast because it's minimal

Intentionally it **does not** implement the full REST API, but only a subset. It shall be lightweight and not bloated with features. Nevertheless, it shall be possible to extend it to your needs with the examples provided.

This mock server tries to mimic the routes and responses of [Jira 9.4.5](https://docs.atlassian.com/software/jira/docs/api/REST/9.4.5/)

## Project Structure

```none
jira-rest-mock-server
├── src
    ├── faker             # extensions to faker-js to fake responsed
    └── server            # express app
       ├── ssl            # SSL configuration
       ├── app.ts         # Entry point of the application
       └── routes         # routes
├── package.json          # npm configuration file
├── tsconfig.json         # TypeScript configuration file
└── README.md             # Project documentation
```

## Installation

Run `npm install` first.

### Set up SSL

Folder `src/server/ssl` contains a default (self-signed) certificate, to enable SSL encryption. Running `npm start` will use these defaults. 

If you want to use your own certificate and keys, please overwrite these files.

## Usage

To start the application, run:

```bash
npm start
```

The application will be available at [https://127.0.0.1:6443](https://127.0.0.1:6443).

Start getting a fake issue using [https://127.0.0.1:6443/rest/api/v2/issue/SAMPLE-12345](https://127.0.0.1:6443/rest/api/v2/issue/SAMPLE-12345)

## API Endpoints

### GET /

Root paths just gives some metadata.

### GET /browse

This route is a simple non-REST route to be able to click on one of the responses as it would be possible with the original server.

### GET /rest/api/v2/search

Search route.

Returns 20 fake search results, not matter what you pass.

### GET /rest/api/v2/issue/:key

Returns an issue every time you call this route.

Example: [https://127.0.0.1:6443/rest/api/v2/issue/SAMPLE-12345](https://127.0.0.1:6443/rest/api/v2/issue/SAMPLE-12345)

It does not matter what key is provided. It is taken as given.

## Development

### Nodemon

In order to restart the server on every file changed whilst development, use nodemon.

Usage:

```bash
npm run nodemon
```

## License

This project is licensed under the MIT License.
