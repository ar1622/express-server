"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderCollection = exports.lessonCollection = void 0;
const mongodb_1 = require("mongodb");
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./shared/logger"));
let server;
const client = new mongodb_1.MongoClient(config_1.default.mongoURI);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lessonCollection;
let orderCollection;
process.on('uncaughtException', error => {
    console.log('🔴 Uncaught exception is detected: ', error);
    process.exit(1);
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const database = client.db('userData');
            exports.lessonCollection = lessonCollection = database.collection('lessonCollection');
            exports.orderCollection = orderCollection = database.collection('orderCollection');
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`🟢 Example app listening on port ${config_1.default.port}`);
            });
            console.log('🟢 Database connected successfully');
        }
        catch (error) {
            logger_1.default.error('🔴 Something wrong here', error);
            process.exit(1);
        }
    });
}
function stopServer() {
    if (server) {
        server.close(() => {
            client.close(); // Close the MongoDB client when shutting down
            logger_1.default.info('🔴 Server closed');
            process.exit(0);
        });
    }
}
process.on('unhandledRejection', error => {
    console.log('🔴 Unhandled rejection is detected: ', error);
    stopServer();
});
process.on('SIGTERM', () => {
    console.log('🔴 SIGTERM is detected. server closed..');
    stopServer();
});
main();
