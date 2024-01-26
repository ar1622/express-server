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
exports.userService = void 0;
const mongodb_1 = require("mongodb");
const apiError_1 = __importDefault(require("../../../Errors/apiError"));
const server_1 = require("../../../server");
const user_utils_1 = require("./user.utils");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user) {
        user.userId = yield (0, user_utils_1.generateUserId)();
    }
    const result = yield server_1.userCollection.insertOne(user);
    if (!result.acknowledged) {
        throw new apiError_1.default(400, 'Failed to create user!');
    }
    // Use the insertedId to find the created user
    const createdUser = yield server_1.userCollection.findOne({ _id: result.insertedId });
    return createdUser;
});
// get all users from the database
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield server_1.userCollection.find({}).toArray();
    if (!allUsers) {
        throw new apiError_1.default(404, 'No users found');
    }
    return allUsers;
});
// get single user from the database
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure that userId is a valid string representation of ObjectId
    if (!mongodb_1.ObjectId.isValid(userId)) {
        throw new apiError_1.default(400, 'Invalid userId');
    }
    const objectId = new mongodb_1.ObjectId(userId);
    // Use findOne to find the user based on ObjectId
    const user = yield server_1.userCollection.findOne({ _id: objectId });
    if (!user) {
        throw new apiError_1.default(404, 'User not found');
    }
    return user;
});
// update user from the database
const updateUser = (userId, updatedUserData) => __awaiter(void 0, void 0, void 0, function* () {
    // is user exist
    // const isExist = await isUserExist(userId)
    // Ensure that userId is a valid string representation of ObjectId
    if (!mongodb_1.ObjectId.isValid(userId)) {
        throw new apiError_1.default(400, 'Invalid userId');
    }
    const objectId = new mongodb_1.ObjectId(userId);
    // Use findOneAndUpdate to find and update the document based on ObjectId
    const result = yield server_1.userCollection.findOneAndUpdate({ _id: objectId }, { $set: updatedUserData }, { returnDocument: 'after' });
    if (!result) {
        throw new apiError_1.default(404, 'User not found');
    }
    return result;
});
// delete user from the database
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure that userId is a valid string representation of ObjectId
    if (!mongodb_1.ObjectId.isValid(userId)) {
        throw new apiError_1.default(400, 'Invalid userId');
    }
    const objectId = new mongodb_1.ObjectId(userId);
    // Use findOneAndDelete to find and delete the document based on ObjectId
    const deletedUser = yield server_1.userCollection.findOneAndDelete({ _id: objectId }, { includeResultMetadata: true });
    if (!deletedUser.value) {
        throw new apiError_1.default(404, 'User not found');
    }
    return deletedUser.value;
});
exports.userService = {
    createUser,
    getAllUser,
    getUser,
    updateUser,
    deleteUser,
};
