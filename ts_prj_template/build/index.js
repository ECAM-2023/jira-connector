"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// Définir les informations d'authentification OAuth2
const clientId = 'nr3DZPJ129vipN5AwMPBiAk0AZDBIs0I';
const clientSecret = 'ATOAa7cwLZ80GoDvHTBInIjh-IJgKrndrYA7ubmF-Km46tb1QiNKxJGBwv3SvFFoL4HJC8918369';
// Définir l'URL de l'API
const apiUrlCloudID = 'https://api.atlassian.com/oauth/token/accessible-resources';
// const CloudID = '332a61e4-de76-4c4b-a218-3f00bc6b47a3';
let CloudID = "";
var timeExpire = 3600;
// const apiUrlUsers = 'https://api.atlassian.com/ex/jira/' + CloudID + '/rest/api/3/users/search?startAt=0&maxResults=50';
// Obtenir un nouveau token d'accès à partir des "Client Credentials"
const getAccessToken = async () => {
    const response = await axios_1.default.post('https://api.atlassian.com/oauth/token', null, {
        params: {
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret
        }
    });
    timeExpire = response.data.expires_in;
    return response.data.access_token;
};
// Effectuer la requête GET avec l'authentification OAuth2 pour obtenir le cloudid
const makeRequest = async () => {
    const accessToken = await getAccessToken();
    const response = await axios_1.default.get(apiUrlCloudID, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    CloudID = response.data[0].id;
    console.log("My cloud ID:", CloudID); // Afficher la réponse de l'API
};
// // Effectuer la requête GET avec le cloudid pour obtenir les users
// const makeRequestUsers = async (): Promise<void> => {
//   const accessToken = await getAccessToken();
//   const response: AxiosResponse = await axios.get(apiUrlUsers, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`
//     }
//   });
//   console.log(response.data); // Afficher la réponse de l'API
// };
// Appeler les fonctions pour effectuer les requêtes GET
makeRequest()
    .catch(error => console.error(error));
// makeRequestUsers()
//     .catch(error => console.error(error));
//# sourceMappingURL=index.js.map