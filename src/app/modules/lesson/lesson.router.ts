import express from 'express';
import { lessonController } from './lesson.controller';

const router = express.Router();


// router for create a new lesson
router.post('/create-new-lesson/', lessonController.createNewLesson)


//  router for get all lesson
router.get('/', lessonController.getAllLessons)

// router for get single lesson
router.get('/:lessonId', lessonController.getSingleLesson)

// update a single lesson
router.put('/update/:lessonId', lessonController.updateLesson)

// delete a single lesson
router.delete('/delete/:lessonId', lessonController.deleteLesson)





export const lessonRouter = router;