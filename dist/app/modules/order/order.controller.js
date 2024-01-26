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
exports.orderController = void 0;
const apiResponse_1 = require("../../../shared/apiResponse");
const tryCatchHandler_1 = require("../../../shared/tryCatchHandler");
const order_service_1 = require("./order.service");
const saveNewOrderCollection = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield order_service_1.orderService.saveNewOrderInformation(data);
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'User Created Successfully',
        body: result,
    });
}));
// write a code to get all orders information from the database
const getAllOrderCollection = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.orderService.getAllOrder();
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Order Collection retrieve Successfully',
        body: result,
    });
}));
// get order details from database
const getOrderDetailsCollection = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const result = yield order_service_1.orderService.getOrderDetails(orderId);
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Order Details retrieve Successfully',
        body: result,
    });
}));
// update order details
const updateSingleOrderCollection = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const data = req.body;
    const result = yield order_service_1.orderService.updateOrder(orderId, data);
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Order Updated Successfully',
        body: result,
    });
}));
// delete order 
const deleteOrderCollection = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const result = yield order_service_1.orderService.deleteOrder(orderId);
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Order Deleted Successfully',
        body: result,
    });
}));
exports.orderController = {
    saveNewOrderCollection,
    getAllOrderCollection,
    getOrderDetailsCollection,
    updateSingleOrderCollection,
    deleteOrderCollection,
};
