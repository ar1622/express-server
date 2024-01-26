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
exports.searchService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../Errors/apiError"));
const server_1 = require("../../../server");
// create a search functionality for the search
const getLessonBasedOnSearchParam = (searchParam) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        $or: [
            { topic: { $regex: searchParam, $options: 'i' } },
            { location: { $regex: searchParam, $options: 'i' } },
            { price: parseFloat(searchParam) || 0 },
            { space: parseInt(searchParam) || 0 },
        ],
    };
    try {
        const result = yield server_1.lessonCollection.find(query).toArray();
        return result;
    }
    catch (error) {
        // Handle errors appropriately
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to get lessons based on search parameter');
    }
});
exports.searchService = {
    getLessonBasedOnSearchParam,
};
