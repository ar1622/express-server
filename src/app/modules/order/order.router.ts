import express from 'express'
import { orderController } from './order.controller'

const router = express.Router()

// save new order information router
router.post('/save-order-details/', orderController.saveNewOrderCollection)

// get all order information router
router.get('/', orderController.getAllOrderCollection)

// get all order information router
router.get('/:id', orderController.getOrderDetailsCollection)

// update single order router
router.put('/update/:id', orderController.updateSingleOrderCollection)

// delete single order router
router.delete('/delete/:id', orderController.deleteOrderCollection)

export { router as orderRouter }

export const OrderRouter = router
