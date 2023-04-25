"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = void 0;
const winston_1 = __importDefault(require("winston"));
function createLogger() {
    return winston_1.default.createLogger({
        level: "info",
        format: winston_1.default.format.json(),
        transports: [
            new winston_1.default.transports.Console(),
            new winston_1.default.transports.File({ filename: "./log/jira.json" }),
        ],
    });
}
exports.createLogger = createLogger;
//# sourceMappingURL=logger.js.map