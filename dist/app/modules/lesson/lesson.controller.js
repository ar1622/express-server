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
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonController = void 0;
const tryCatchHandler_1 = require("../../../shared/tryCatchHandler");
const apiResponse_1 = require("../../../shared/apiResponse");
const lesson_service_1 = require("./lesson.service");
// create a new lesson
const createNewLesson = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = req.body;
    const result = yield lesson_service_1.lessonService.createLesson(lesson);
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Lesson Created Successfully',
        body: result,
    });
}));
// get all lessons from the database
const getAllLessons = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lesson_service_1.lessonService.getAllLessons();
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Lesson Retrieved Successfully',
        body: result,
    });
}));
// get single lesson from the lesson collection
const getSingleLesson = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lessonId = req.params.lessonId;
    const result = yield lesson_service_1.lessonService.getSingleLesson(lessonId);
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Lesson Retrieved Successfully',
        body: result,
    });
}));
// update a lesson from the lesson collection
const updateLesson = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lessonId = req.params.lessonId;
    const lesson = req.body;
    const result = yield lesson_service_1.lessonService.updateLesson(lessonId, lesson);
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Lesson Updated Successfully',
        body: result,
    });
}));
// delete a lesson from the lesson collection
const deleteLesson = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lessonId = req.params.lessonId;
    const result = yield lesson_service_1.lessonService.deleteLesson(lessonId);
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Lesson Deleted Successfully',
        body: result,
    });
}));
exports.lessonController = {
    createNewLesson,
    getAllLessons,
    getSingleLesson,
    updateLesson,
    deleteLesson,
};
