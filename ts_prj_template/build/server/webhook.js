"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = require("../lib/logger");
const logger = (0, logger_1.createLogger)();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// Définir l'URL pour le webhook
const webhookUrl = '/';
// Définir le gestionnaire de route pour le webhook
app.post(webhookUrl, (req, res) => {
    // console.log("Requête reçue depuis le webhook : ", req.body);
    switch (req.body.webhookEvent) {
        case 'worklog_created': {
            logger.info('Worklog created : ' + req.body.worklog.timeSpentSeconds, req.body.worklog.author.displayName, req.body.worklog.comment);
            break;
        }
        case 'worklog_updated': {
            logger.info('Worklog updated : ' + req.body.worklog.timeSpentSeconds, req.body.worklog.author.displayName, req.body.worklog.comment);
            break;
        }
        case 'worklog_deleted': {
            logger.info('Worklog deleted : ' + req.body.worklog.timeSpentSeconds, req.body.worklog.author.displayName, req.body.worklog.comment);
            break;
        }
        case 'jira:issue_created': {
            logger.info('Issue created : ' + req.body.issue.id);
            break;
        }
        case 'jira:issue_updated': {
            logger.info('Issue updated : ' + req.body.issue.id);
            break;
        }
        case 'jira:issue_deleted': {
            logger.info('Issue deleted : ' + req.body.issue.id);
            break;
        }
        case 'comment_created': {
            logger.info('Comment created : ' + req.body.comment.body, req.body.comment.author.displayName);
            break;
        }
        case 'comment_updated': {
            logger.info('Comment updated : ' + req.body.comment.body, req.body.comment.author.displayName);
            break;
        }
        case 'comment_deleted': {
            logger.info('Comment deleted : ' + req.body.comment.body, req.body.comment.author.displayName);
            break;
        }
    }
    res.status(200).send('Webhook reçu avec succès !');
});
// Démarrer le serveur
//écoute sur le port 3000
app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
//rajouter l'async (route et logger)
//# sourceMappingURL=webhook.js.map