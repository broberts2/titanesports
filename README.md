development# Titan eSports

TES web/server documentation.

### Intalling Node.js and NPM

Install Node (npm in included in the default distribution) here: https://nodejs.org/en/download.

### Installing Git

Install Git here: https://git-scm.com/downloads.

### Git Commands

#### Common Commands

Run this command to add new files to your pending commit.

```
git add .
```

Run this command to add new files to your pending commit.

```
git commit -m "<type in your commit note here. Can be anything.>"
```

Run this command to push your commit to the specified branch.

```
git push origin <branch>
```

Run this command to pull and merge your current branch from master. You will need to resolve any merge conflicts. Typically, typing ":q" then "enter" is enough. Otherwise, you will need to find the conflict in the mentioned file and choose which code to implement. If this happens, please contact Jetgorilla on discord.

```
git pull origin master
```

Run this command to fork and create a new branch.

```
git checkout -b <branch>
```

Run this command to navigate back to specified branch.

```
git checkout <branch>
```

### Project Node Commands (works for both develepment and production)

Run this command to commit to git with 'auto' comment on master branch from local host. **Note: Requires Github credentials.**

```
npm run local-push
```

Run this command to commit to git with 'auto' comment on master branch from web server. **Note: Requires Github credentials.**

```
npm run server-push
```

Run this command to merge with master branch. **Note: :q to exit vim.**

```
npm run pull
```

Run this command to prompt patch number and automatically update dragontail.

```
npm run patch-update
```

Run this command to restart apache, mongodb, back-end, and titan-draft servers.

```
npm run restart
```

Run this command to overwrite front-end files with src.

```
npm run update-src
```

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

Now that you have the project cloned, dependencies installed, and possess the proper configuration files, you may run `npm start` to spin up the front-end development server. The server will be running on port 3000 by default and may be accessed by navigating to `http://localhost:3000` in your browser.

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

Rest api reference for TES. You may either make the GET, POST, PUT, or DELETE request yourself or use the **globals.api** object methods (recommended) to make these calls. **Note: There's a lot to add here so it will be a few days before I have the documentation completed.**

### Api Endpoints (Unnecessary with Api object methods)

#### Development

http://localhost:8000

#### Production

https://titan-esports.org:8000

### GET Routes

#### /loginUser

Returns a titan_key token as a string when given an object containing username and password.

```
globals.api.loginUser({
  username: <string>,
  password: <string>
})
```

#### /getUser

Returns an object given a string with the user's MongoDB id.

```
globals.api.getUser({
  user: <string>
})
```

#### /getDraftLogos

Returns an object given a string with the user's MongoDB id.

```
globals.api.getDraftLogos()
```

#### /getIconList

Returns an object containing icons.

```
globals.api.getIconList()
```

#### /getAllUsers

Returns an array of user objects.

```
globals.api.getAllUsers()
```

#### /getAllTeams

Returns an array of team objects.

```
globals.api.getAllTeams()
```

#### /getProfileVideos

Returns an array of available profile video urls.

```
globals.api.getProfileVideos()
```

#### /getSlayersGuild

Returns an array of slayer's guild episodes within the youtube slayer's guild playlist.

```
globals.api.getSlayersGuild()
```

#### /requestProfileIconList

Returns an array of available image urls when given an object with and index and size.

```
globals.api.requestProfileIconList({
  index: <integer>,
  size: <integer>
})
```

#### /s/validateToken

Returns user object if titan_key header value decryption is successful.
**Note: Will automatically assign titan_key header from stored titan_key cookie value when called in project.**

```
globals.api.validateToken()
```

#### /emailResetKey

Returns confidential key string when given an object with email.

```
globals.api.emailResetKey({
  email: <string>
})
```

#### /getEvents

Returns an object array of all scheduled calendar events.

```
globals.api.getEvents()
```

#### /getArticles

Returns an object array of all articles.

```
globals.api.getArticles()
```

#### /getArticle

Returns an article object when given a MongoDB string id.

```
globals.api.getArticle({
  article: <string>
})
```

### POST Routes

#### /createTitanDraft

Returns a titan_draft object when given an object with type, t1_logo, t2_logo, t1_name, t2_name.

Valid images for t1_logo and t2_logo may be referenced in /titan_draft/logo_index.js.

```
globals.api.createTitanDraft({
  type: <string>, // Value must be 'tournament'
  t1_logo: <string>,
  t2_logo: <string>,
  t1_name: <string>,
  t2_name: <string>,
})
```

#### /createUser

Returns a user object and creates a user document when given an object with username and password.

```
globals.api.createUser({
  username: <string>,
  password: <string>,
})
```

#### /compareResetKey

Compares a key with a hashed password.

```
globals.api.compareResetKey({
  key: <string>,
  password: <string>
})
```

#### /createEvent

Creates a calendar event given an object with date, title, events, and icon.

```
globals.api.createEvent({
  date: <string>,
  title: <string>,
  events: <array>,
  icon: <integer>
})
```

#### /createArticle

Creates an article object given an object containing an article string.

```
globals.api.createEvent({
  article: <string>
})
```

### PUT Routes

#### /s/updateSlayersGuild

Updates slayers guild object automatically via youtube api and youtube playlist. Limited calls/hour.

```
globals.api.updateSlayersGuild()
```

#### /s/updateSelf

Updates a self user's object given an object with any combination of the following key-value pairs:

```
globals.api.updateSelf({
  password: <string>,
  level: <integer>,
  iconId: <string>,
  email: <string>,
  suspended: <boolean>,
  verified: <boolean>,
  isAdmin: <boolean>,
  biography: <string>,
  communityTitle: <string>,
  profileVideo: <string>,
  opgg: <string>,
  reset_code: <string>,
  lolAccountId: <string>,
  summonerId: <string>
})
```

#### /s/updateSelfPassword

Changes a self user's password given an object with an old and new password. Success conditional upon old password validation.

```
globals.api.updateSelfPassword({
  oldPassword: <string>,
  newPassword: <string>
})
```

#### /s/updateUser?id=`<string>`

Updates a user's object given an object with a required id and any combination of the following key-value pairs:

```
globals.api.updateUser({
  id: <string>,
  username: <string>,
  password: <string>,
  level: <integer>,
  iconId: <string>,
  email: <string>,
  suspended: <boolean>,
  verified: <boolean>,
  isAdmin: <boolean>,
  biography: <string>,
  communityTitle: <string>,
  profileVideo: <string>,
  opgg: <string>,
  reset_code: <string>,
  lolAccountId: <string>,
  summonerId: <string>
})
```

#### /movePlayerToTeam

Moves a player object to a team and removes from previous team if already a member given a teamId, fromTeamId, and player object.

```
globals.api.movePlayerToTeam({
  teamId: <string>,
  fromTeamId: <string>,
  player: {
    playerId: <string>,
    username: <string>,
    position: <string>
  }
})
```

#### /updateTeam

Description

```
globals.api.updateTeam({

})
```

#### /updateEvent

Description

```
globals.api.updateEvent({

})
```

#### /updateArticle

Description

```
globals.api.updateArticle({

})
```

### DELETE Routes

#### /removePlayerFromTeam

Description

```
globals.api.removePlayerFromTeam({

})
```

#### /removeEvent

Description

```
globals.api.removeEvent({

})
```

#### /removeArticle

Description

```
globals.api.removeArticle({

})
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
