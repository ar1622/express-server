"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonRouter = void 0;
const express_1 = __importDefault(require("express"));
const lesson_controller_1 = require("./lesson.controller");
const router = express_1.default.Router();
// router for create a new lesson
router.post('/create-new-lesson/', lesson_controller_1.lessonController.createNewLesson);
//  router for get all lesson
router.get('/', lesson_controller_1.lessonController.getAllLessons);
// router for get single lesson
router.get('/:lessonId', lesson_controller_1.lessonController.getSingleLesson);
// update a single lesson
router.put('/update/:lessonId', lesson_controller_1.lessonController.updateLesson);
// delete a single lesson
router.delete('/delete/:lessonId', lesson_controller_1.lessonController.deleteLesson);
exports.lessonRouter = router;
