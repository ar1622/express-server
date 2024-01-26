"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lesson_router_1 = require("../modules/lesson/lesson.router");
const order_router_1 = require("../modules/order/order.router");
const search_router_1 = require("../modules/search/search.router");
const router = express_1.default.Router();
const allRoutes = [
    {
        path: '/lesson/',
        route: lesson_router_1.lessonRouter,
    },
    {
        path: '/order/',
        route: order_router_1.OrderRouter,
    },
    {
        path: '/search/',
        route: search_router_1.searchRouter,
    },
];
allRoutes.forEach(route => router.use(route === null || route === void 0 ? void 0 : route.path, route === null || route === void 0 ? void 0 : route.route));
exports.default = router;
