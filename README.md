# Titan eSports

TES web/server documentation

## Installation Prerequisites

### Intalling Node.js and NPM

Install Node (npm in included in the default distribution) here: https://nodejs.org/en/download.

### Installing Git

Install Git here: https://git-scm.com/downloads.

## Config Files, Updating, and Running

Clone the project with `git clone https://github.com/broberts2/titanesports.git <directory>`. Navigate to this new directory and run `npm install` to install project dependencies.

Before you get started, you will need to include two separate configuration files in `/src` and `/server`. Server/config.js is naturally excluded from this repository because it contains sensitive information pertaining to TES. The files look like this:

### src/config.js

```javascript
module.exports = {
  serverPath: process.env.production
    ? "https://titan-esports.org:8000"
    : "http://localhost:8000",
  tPath: process.env.production
    ? "https://titan-esports.org:7001"
    : "http://localhost:7001"
};
```

### server/config.js

```javascript
module.exports = {
  titanEmail: "<example_email>",
  titanPassword: "<email_password>",
  youtubeApiKey: "<youtube_api_key>",
  production: false,
  db: process.env.MONGODB_URI || "mongodb://localhost/titanesports",
  tournamentApiKey: "<riot_games_tournament_api_key>",
  secret: "<token_salt>",
  port: 8000
};
```

Now that you have project cloned, dependecies installed, and possess the proper configuration files, you may run `npm start` to spin up the front-end development server. The server will be running on port 3000 by default and may be accessed by navigating to `http://localhost:3000` in your browser.

## File Structure

### Front End

```
├── .git (hidden git files that you won't need to touch)
├── audio (audio files for 'Titan Draft')
├── champion_videos (potential 'Titan Draft' champion animations *experimental*)
├── config (file created by running 'npm eject' - ignore this file)
├── logos (team logos used in website and 'Titan Draft' instances)
├── profile_videos (videos used as profile backgrounds on website)
├── public (html document injection root - ignore this)
├── scripts (npm scripts - ignore this)
├── src (you will be spending 99% of your time here. this file contains all of the website components)
  └── * Needs Documentation *
├── game_version (used to denote the current game/patch version i.e. 10.2.1. used in both front & back end code)
├── package-lock (auto generated from npm - ignore this)
├── package (software descriptor and metadata - ignore this)
├── README (what you're reading right now)
├── yarn (auto-generated file from yarn - ignore this)
```

### Back End

```
├── server
  └── * Needs Documentation *
```

### Titan Draft

```
├── titan_draft ('titan draft' folder. serves files from backend after connecting to port 7001 and connecting via websocket)
  └── * Needs Documentation *
```

## Titan E-Sports API Refrence

Rest api reference for TES. You may either make the GET, POST, PUT, or DELETE request yourself or use the Api.js object methods (recommended) to make these calls. **Note: There's a lot to add here so it will be a few days before I have the documentation completed.**

### GET Routes

/loginUser
Returns `titan_key` token used for protected routes and authentication. Also stores token in web browser as cookie.

```
Api.loginUser({
  username: "username",
  password: "password"
})
```

/getUser?u=<user_id>

```
Api.getUser(id)
```

/getAllUsers

```
Api.getAllUsers()
```

/getAllTeams

```
Api.getAllTeams()
```

/getProfileVideos

```
Api.getProfileVideos()
```

/getSlayersGuild

```
Api.getSlayersGuild()
```

/getIconsList?index=<index>&size=<size>

```
Api.requestProfileIconList(index, size)
```

/s/validateToken

```
Api.validateToken()
```

### POST Routes

/api/createDraft

```
Api.createTitanDraft({
  type: "tournament",
  t1_logo: "img_path",
  t2_logo: "img_path",
  t1_name: "team_name"
  t2_name: "team_name"
})
```

/createUser

```
Api.createUser({
  username: "username",
  password: "password",
  password2: "confirm_password",
  email: "email@example.com"
})
```

/compareResetKey?key=<key>

```
Api.compareResetKey({
  key: "key",
  password: "password",
})
```

### PUT Routes

/updateSlayersGuild

```
Api.updateSlayersGuild()
```

/s/updateSelf

```
Api.updateSelf(obj)
```

### DELETE Routes

/loginUser

```
Api.loginUser({
  username: "username",
  password: "password"
})
```

```
├── titan_draft ('titan draft' folder. serves files from backend after connecting to port 7001 and connecting via websocket)
  └── * Needs Documentation *
```

## Setting Up the Database

This project uses MongoDB for persistent data and can be found here: https://docs.mongodb.com/manual/installation/.
I will be adding to this in the future with setup instructions so that you can run your own local database for testing.
**Note: This will not connect you to the live database. This is for development purposes only but will give you full simulated functionality.**

## Authors & Contributors

- **Broc Roberts** - [broberts2](https://github.com/broberts2)

- **Krysten Allen**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- TES Community
