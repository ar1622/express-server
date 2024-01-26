"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userCollection = void 0;
const mongoose_1 = require("mongoose");
const server_1 = require("../../../server");
exports.userCollection = server_1.Database.collection('user');
const userSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});
exports.User = (0, mongoose_1.model)('user', userSchema);
