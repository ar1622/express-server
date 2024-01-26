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
exports.isUserExist = exports.generateUserId = void 0;
const apiError_1 = __importDefault(require("../../../Errors/apiError"));
const server_1 = require("../../../server");
const mongodb_1 = require("mongodb");
const findsLastUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lastUser = yield server_1.userCollection
            .find({}, { projection: { userId: 1, _id: 0 } })
            .sort({ created_at: -1 })
            .limit(1)
            .toArray();
        if (lastUser && lastUser.length > 0) {
            return lastUser[0].userId;
        }
        else {
            return null; // Return null if no user is found
        }
    }
    catch (error) {
        throw new Error('Internal Server Error');
    }
});
const generateUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lastUserId = yield findsLastUserId();
        const nextUserId = (parseInt(lastUserId || '0') + 1)
            .toString()
            .padStart(4, '0');
        return nextUserId;
    }
    catch (error) {
        throw new Error('Internal Server Error');
    }
});
exports.generateUserId = generateUserId;
const isUserExist = (objectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ensure that objectId is a valid string representation of ObjectId
        if (!mongodb_1.ObjectId.isValid(objectId)) {
            throw new apiError_1.default(400, 'Invalid ObjectId');
        }
        const user = yield server_1.userCollection.findOne({ _id: new mongodb_1.ObjectId(objectId) });
        return !!user; // Returns true if user exists, false otherwise
    }
    catch (error) {
        throw new apiError_1.default(500, 'Internal Server Error');
    }
});
exports.isUserExist = isUserExist;
