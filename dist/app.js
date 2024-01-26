"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const apiNotFoundError_1 = require("./app/middleware/apiNotFoundError");
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// Parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Application configuration routes
app.use(routes_1.default);
// Testing routers for testing purposes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Global Error Handler
app.use(globalErrorHandler_1.default);
app.use(apiNotFoundError_1.ApiNotFoundError);
exports.default = app;
