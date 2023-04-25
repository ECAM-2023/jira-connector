"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
let timeExpire = 1;
let accessToken = "";
let CloudID = "";
// Définir les informations d'authentification OAuth2
const clientId = 'nr3DZPJ129vipN5AwMPBiAk0AZDBIs0I';
const clientSecret = 'ATOAa7cwLZ80GoDvHTBInIjh-IJgKrndrYA7ubmF-Km46tb1QiNKxJGBwv3SvFFoL4HJC8918369';
const apiUrlCloudID = 'https://api.atlassian.com/oauth/token/accessible-resources';
// const fs = require("fs");
// Obtenir un nouveau token d'accès à partir des "Client Credentials"
(async () => {
    const responseAccessToken = await axios_1.default.post('https://api.atlassian.com/oauth/token', null, {
        params: {
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret
        }
    });
    timeExpire = responseAccessToken.data.expires_in;
    accessToken = responseAccessToken.data.access_token;
    const responseApiCloudID = await axios_1.default.get(apiUrlCloudID, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    CloudID = responseApiCloudID.data[0].id;
    const test = {
        id: 'CloudID',
    };
    // // converting the JSON object to a string
    // const cloudid = JSON.stringify(test);
    // // writing the JSON string content to a file
    // fs.writeFile("../library/OAuth2/cloudid.json", cloudid, function(error) {
    // if (error) throw error;
    // console.log('complete');
    // });
    const responseUser = await axios_1.default.get(`https://api.atlassian.com/ex/jira/${CloudID}/rest/api/3/users/search?startAt=0&maxResults=50`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    console.log(responseUser.data[0].displayName);
})();
//# sourceMappingURL=accestoken.js.map