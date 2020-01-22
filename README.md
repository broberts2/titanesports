# Titan eSports

TES web/server documentation

### Intalling Node.js and NPM

Install Node (npm in included in the default distribution) here: https://nodejs.org/en/download.

### Installing Git

Install Git here: https://git-scm.com/downloads.

### Git Commands

Run this command to add new files to your pending commit

```
git add .
```

Run this command to add new files to your pending commit

```
git commit -m "<type in your commit note here>"
```

Run this command to push your commit to the specified branch

```
git push remote <branch>
```

Run this command to pull and merge your current branch from master. You will need to resolve any merge conflicts. Typically, typing ":q" then "enter" is enough. Otherwise, you will need to find the conflict in the mentioned file and choose which code to implement. If this happens, please contact Jetgorilla on discord

```
git pull origin master
```

Run this command to fork and create a new branch

```
git checkout -b <branch>
```

Run this command to navigate back to specified branch

```
git checkout <branch>
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

#### /loginUser

Returns `titan_key` token used for protected routes and authentication. Also stores token in web browser as cookie.

```
Api.loginUser({
  username: "username",
  password: "password"
})
```

#### /getUser?u=<user_id>

```
Api.getUser(id)
```

#### /getAllUsers

```
Api.getAllUsers()
```

#### /getAllTeams

```
Api.getAllTeams()
```

#### /getProfileVideos

```
Api.getProfileVideos()
```

#### /getSlayersGuild

```
Api.getSlayersGuild()
```

#### /getIconsList?index=<index>&size=<size>

```
Api.requestProfileIconList(index, size)
```

#### /s/validateToken

```
Api.validateToken()
```

### POST Routes

#### /api/createDraft

```
Api.createTitanDraft({
  type: "tournament",
  t1_logo: "img_path",
  t2_logo: "img_path",
  t1_name: "team_name"
  t2_name: "team_name"
})
```

#### /createUser

```
Api.createUser({
  username: "username",
  password: "password",
  password2: "confirm_password",
  email: "email@example.com"
})
```

#### /compareResetKey?key=<key>

```
Api.compareResetKey({
  key: "key",
  password: "password",
})
```

### PUT Routes

#### /updateSlayersGuild

```
Api.updateSlayersGuild()
```

#### /s/updateSelf

```
Api.updateSelf(obj)
```

### DELETE Routes

#### /loginUser

```
Api.loginUser({
  username: "username",
  password: "password"
})
```

## Some basic React Documentation

If you haven't worked with React before and have only worked with html, css, and maybe some vanilla js or jquery, hopefully this will help you. A simple React component will look something like this:

```javascript
import React from "react";
import { connect } from "react-redux";
import "./example.css";

import Api from "../../Api";

class Example extends React.Component {
  // An example of a function that you can use inside or outside of your JSX (optional but extremely useful)
  barkingFunction() {
    console.log("I'm a function that prints to the browser console");
  }

  // This function is really important since this component will not render anything without it
  render() {
    // Every time this component is rendered it will run barkFunction()
    this.barkFunction(); // Equivalent of saying 'Example.barkFunction()'
    return (
      <div className={"example"}>
        <h1>Hello World!</h1>
        <button
          onClick={async () => {
            const result = await Api.loginUser({
              username: "username",
              password: "password"
            });
            console.log(result);
          }}
        >
          Button that logs in a user
        </button>
      </div>
    );
  }
}

export default connect()(Example);
```

The important takeaway here is the use of the render function within the Example class and the use of imports to include code form other files.

Components can be shared across the site by importing from their specific file like so:

```javascript
import Example from "<path_to_file>"

...

<div>
  <Example />
</div>
```

There's a ton more to this so I will be adding more documentation when I can but hopefully this makes some sense so far

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
