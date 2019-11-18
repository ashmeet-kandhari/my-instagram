# My-Instagram

A web interface similar to pinterest using ReactJS.
Only a single fake user has been created by default whose username and password is `user`.

The server.js acts as proxy for images endpoint (default is "https://pixabay.com/api/") as well as login.

## Pre-requisites

- Node > 8
- run `npm i` from project root folder as well as `server` folder
- By default images are fetched from "https://pixabay.com/api/"
- You need to add your own account key for pixabay in `server/server.js` to make it work.

# Steps to run in production mode

- By default api login endpoint is defined in `src/utils/auth.js`
- By default images endpoint is defined in `src/home-page/HomePage.js` which hits the server.js
- From root folder run `npm run build`.
- From server folder run `npm start`.
- Server runs on port `9000`

# Steps to run in development mode

- From root folder run `npm start`
- By default api login endpoint is defined in `src/utils/auth.js`
- By default images endpoint is defined in `src/home-page/HomePage.js` which hits the server.js
- Proxy server is defined in `package.json`
- For login server please start node server in `server` folder using `npm start` from that folder.
- Front end Server runs on port `3000` and backend on `9000`
