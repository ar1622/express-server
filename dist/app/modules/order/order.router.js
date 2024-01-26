"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
exports.orderRouter = router;
// save new order information router
router.post('/save-order-details/', order_controller_1.orderController.saveNewOrderCollection);
// get all order information router
router.get('/', order_controller_1.orderController.getAllOrderCollection);
// get all order information router
router.get('/:id', order_controller_1.orderController.getOrderDetailsCollection);
// update single order router
router.put('/update/:id', order_controller_1.orderController.updateSingleOrderCollection);
// delete single order router
router.delete('/delete/:id', order_controller_1.orderController.deleteOrderCollection);
exports.OrderRouter = router;
