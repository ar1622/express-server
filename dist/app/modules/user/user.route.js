"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationHandler_1 = require("../../middleware/zodValidationHandler");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
// create new user router
router.post('/create-user', (0, zodValidationHandler_1.zodValidationHandler)(user_validation_1.UserValidationSchema), user_controller_1.userController.createNewUser);
// get router
router.get('/', user_controller_1.userController.getAllUsers);
// get single router
router.get('/:userId', user_controller_1.userController.getSingleUser);
// update router
router.put('/update-user/:userId', (0, zodValidationHandler_1.zodValidationHandler)(user_validation_1.UserUpdateValidationSchema), user_controller_1.userController.updateUser);
// delete router
router.delete('/delete-user/:userId', user_controller_1.userController.deleteUser);
exports.userRoutes = router;
