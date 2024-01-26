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
exports.lessonService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongodb_1 = require("mongodb");
const apiError_1 = __importDefault(require("../../../Errors/apiError"));
const server_1 = require("../../../server");
// create a new lesson
const createLesson = (lesson) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield server_1.lessonCollection.insertOne(lesson);
    if (!result.acknowledged) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create lesson!');
    }
    const objectId = new mongodb_1.ObjectId(result.insertedId);
    // Use the insertedId to find the created lesson
    const createdLesson = yield server_1.lessonCollection.findOne({
        _id: objectId,
    });
    return createdLesson;
});
// get all lesson from the database
const getAllLessons = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield server_1.lessonCollection.find().toArray();
    if (!result) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to get all lessons!');
    }
    return result;
});
// get single lesson from the lesson collection
const getSingleLesson = (lessonId) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongodb_1.ObjectId(lessonId);
    const result = yield server_1.lessonCollection.findOne({ _id: objectId });
    if (!result) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to get lesson!');
    }
    return result;
});
// update a lesson from the lesson collection
const updateLesson = (lessonId, lesson) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongodb_1.ObjectId(lessonId);
    const result = yield server_1.lessonCollection.findOneAndUpdate({ _id: objectId }, { $set: lesson }, { returnDocument: 'after' });
    if (!result) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update lesson!');
    }
    return result;
});
// delete a lesson from the lesson collection
const deleteLesson = (lessonId) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongodb_1.ObjectId(lessonId);
    const result = yield server_1.lessonCollection.findOneAndDelete({ _id: objectId });
    if (!result) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete lesson!');
    }
    return result;
});
exports.lessonService = {
    createLesson,
    getAllLessons,
    getSingleLesson,
    updateLesson,
    deleteLesson,
};
