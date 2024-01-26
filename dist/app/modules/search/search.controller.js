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
exports.searchController = void 0;
const tryCatchHandler_1 = require("../../../shared/tryCatchHandler");
const search_service_1 = require("./search.service");
const apiResponse_1 = require("../../../shared/apiResponse");
// import { searchField } from '../../../constants/searchField'
// import { Pick } from '../../../utils/pick'
const getAllLessonBasedOnParams = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield search_service_1.searchService.getLessonBasedOnSearchParam(req.query.search);
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Lesson Retrieved Successfully',
        body: result,
    });
}));
exports.searchController = {
    getAllLessonBasedOnParams,
};
