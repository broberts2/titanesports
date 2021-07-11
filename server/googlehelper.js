var fs = require("fs");
var readline = require("readline");
const { google } = require("googleapis");
var OAuth2 = google.auth.OAuth2;
const config = require("./config");
var SCOPES = [
	"https://www.googleapis.com/auth/youtube",
	"https://www.googleapis.com/auth/youtube.upload",
];
var TOKEN_DIR = `${__dirname}`;
var TOKEN_PATH = `${TOKEN_DIR}/youtube-nodejs-quickstart.json`;

function authorize(credentials, resolve, callback) {
	var clientSecret = credentials.client_secret;
	var clientId = credentials.client_id;
	var redirectUrl = credentials.redirect_uris[0];
	var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
	fs.readFile(TOKEN_PATH, function (err, token) {
		if (err) {
			getNewToken(oauth2Client, resolve, callback);
		} else {
			oauth2Client.credentials = JSON.parse(token);
			callback(resolve, oauth2Client, google);
		}
	});
}

function getNewToken(oauth2Client, resolve, callback) {
	var authUrl = oauth2Client.generateAuthUrl({
		access_type: "offline",
		scope: SCOPES,
	});
	console.log("Authorize this app by visiting this url: ", authUrl);
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question("Enter the code from that page here: ", function (code) {
		rl.close();
		oauth2Client.getToken(code, function (err, token) {
			if (err) {
				console.log("Error while trying to retrieve access token", err);
				return;
			}
			oauth2Client.credentials = token;
			storeToken(token);
			callback(resolve, oauth2Client, google);
		});
	});
}

function storeToken(token) {
	try {
		fs.mkdirSync(TOKEN_DIR);
	} catch (err) {
		if (err.code != "EEXIST") {
			throw err;
		}
	}
	fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
		if (err) throw err;
		console.log("Token stored to " + TOKEN_PATH);
	});
}

module.exports = async (callback) =>
	await new Promise((resolve) =>
		authorize(config.google.web, resolve, callback)
	);
