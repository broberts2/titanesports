const fs = require("fs");
const { google } = require("googleapis");
const get_access_token = require("./get_access_token").get_access_token;

const TOKEN_PATH = "./token.json";

module.exports = {
  authorize: (credentials, callback) => {
    return new Promise((resolve, reject) => {
      const { client_secret, client_id, redirect_uris } = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
      );
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return get_access_token(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        resolve(callback(oAuth2Client));
      });
    });
  }
};
