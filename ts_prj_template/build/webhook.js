"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = require("./logger");
const logger = (0, logger_1.createLogger)();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// Définir l'URL pour le webhook
const webhookUrl = "/";
// Définir le gestionnaire de route pour le webhook
app.post(webhookUrl, (req, res) => {
    // console.log("Requête reçue depuis le webhook : ", req.body);
    logger.info("Updated Jira issue", req.body);
    res.status(200).send("Webhook reçu avec succès !");
});
// Démarrer le serveur
//écoute sur le port 3000
app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});
//# sourceMappingURL=webhook.js.map