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
exports.userController = void 0;
const apiResponse_1 = require("../../../shared/apiResponse");
const tryCatchHandler_1 = require("../../../shared/tryCatchHandler");
const user_service_1 = require("./user.service");
const createNewUser = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield user_service_1.userService.createUser(user);
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'User Created Successfully',
        body: result,
    });
}));
// get all users from the database
const getAllUsers = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getAllUser();
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Users Retrieved Successfully',
        body: result,
    });
}));
// get single user from the database
const getSingleUser = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const result = yield user_service_1.userService.getUser(userId);
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'User Retrieved Successfully',
        body: result,
    });
}));
// update user
const updateUser = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = req.body;
    const result = yield user_service_1.userService.updateUser(userId, user);
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'User Updated Successfully',
        body: result,
    });
}));
// delete user
const deleteUser = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const result = yield user_service_1.userService.deleteUser(userId);
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'User Deleted Successfully',
        body: result,
    });
}));
exports.userController = {
    createNewUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
