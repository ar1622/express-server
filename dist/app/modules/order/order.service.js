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
exports.orderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongodb_1 = require("mongodb");
const apiError_1 = __importDefault(require("../../../Errors/apiError"));
const server_1 = require("../../../server");
// save new order information in the database
const saveNewOrderInformation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield server_1.orderCollection.insertOne(data);
    if (!result.acknowledged) {
        throw new apiError_1.default(400, 'Failed to create data!');
    }
    // Use the insertedId to find the created user
    const createdUser = yield server_1.orderCollection.findOne({ _id: result.insertedId });
    return createdUser;
});
// get all order information from the database with populated lessons
const getAllOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOrders = yield server_1.orderCollection.find({}).toArray();
        if (allOrders.length === 0) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
        }
        const lessonIds = [...new Set(allOrders.flatMap(order => order.lessonIds))];
        const objectIds = lessonIds.map(id => new mongodb_1.ObjectId(id));
        const lessons = yield server_1.lessonCollection
            .find({ _id: { $in: objectIds } })
            .toArray();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mapOrderWithLessons = (order) => {
            const filteredLessons = lessons.filter(lesson => order.lessonIds.includes(String(lesson._id)));
            return Object.assign(Object.assign({}, order), { lessonIds: filteredLessons });
        };
        const ordersWithLessons = allOrders.map(mapOrderWithLessons);
        return ordersWithLessons;
    }
    catch (error) {
        throw new apiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }
});
// get single order information from the database with populated lessons
const getOrderDetails = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield server_1.orderCollection.findOne({ _id: new mongodb_1.ObjectId(orderId) });
    if (!order) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    }
    // Extract all unique lessonIds from all orders
    const lessonIds = Array.from(new Set(order.lessonIds.flatMap(order => order)));
    const objectIds = lessonIds.map(id => new mongodb_1.ObjectId(id));
    // Fetch all lessons that match the order's lessonIds
    const lessons = yield server_1.lessonCollection
        .find({ _id: { $in: objectIds } })
        .toArray();
    // Populate the 'lessons' field in the order
    const orderWithLessons = Object.assign(Object.assign({}, order), { lessonIds: lessons });
    return orderWithLessons;
});
// update single order from the database
const updateOrder = (orderId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield server_1.orderCollection.updateOne({ _id: new mongodb_1.ObjectId(orderId) }, { $set: data });
    if (!result.acknowledged) {
        throw new apiError_1.default(400, 'Failed to update data!');
    }
    const updatedOrder = yield server_1.orderCollection.findOne({
        _id: new mongodb_1.ObjectId(orderId),
    });
    return updatedOrder;
});
// delete a order from the database
const deleteOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield server_1.orderCollection.deleteOne({ _id: new mongodb_1.ObjectId(orderId) });
    if (!result.deletedCount) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    }
    return null;
});
exports.orderService = {
    saveNewOrderInformation,
    getAllOrder,
    getOrderDetails,
    deleteOrder,
    updateOrder,
};
