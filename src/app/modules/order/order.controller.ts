import { RequestHandler } from 'express'
import { ApiResponse } from '../../../shared/apiResponse'
import { TryCatchHandler } from '../../../shared/tryCatchHandler'
import { IOrder, IOrderResponse } from './order.interface'
import { orderService } from './order.service'

const saveNewOrderCollection: RequestHandler = TryCatchHandler(
  async (req, res) => {
    const data = req.body
    const result = await orderService.saveNewOrderInformation(data)
    ApiResponse<IOrder>(res, {
      statusCode: 200,
      success: true,
      message: 'User Created Successfully',
      body: result,
    })
  },
)

// write a code to get all orders information from the database
const getAllOrderCollection: RequestHandler = TryCatchHandler(
  async (req, res) => {
    const result = await orderService.getAllOrder()
    ApiResponse<IOrderResponse[]>(res, {
      statusCode: 200,
      success: true,
      message: 'Order Collection retrieve Successfully',
      body: result,
    })
  },
)

// get order details from database
const getOrderDetailsCollection: RequestHandler = TryCatchHandler(
  async (req, res) => {
    const orderId = req.params.id
    const result = await orderService.getOrderDetails(orderId)
    ApiResponse<IOrderResponse>(res, {
      statusCode: 200,
      success: true,
      message: 'Order Details retrieve Successfully',
      body: result,
    })
  },
)


// update order details
const updateSingleOrderCollection: RequestHandler = TryCatchHandler(
  async (req, res) => {
    const orderId = req.params.id
    const data = req.body
    const result = await orderService.updateOrder(orderId, data)
    ApiResponse<IOrder>(res, {
      statusCode: 200,
      success: true,
      message: 'Order Updated Successfully',
      body: result,
    })
  },
)


// delete order 

const deleteOrderCollection: RequestHandler = TryCatchHandler(
  async (req, res) => {
    const orderId = req.params.id
    const result = await orderService.deleteOrder(orderId)
    ApiResponse<IOrderResponse>(res, {
      statusCode: 200,
      success: true,
      message: 'Order Deleted Successfully',
      body: result,
    })
  },
)

export const orderController = {
  saveNewOrderCollection,
  getAllOrderCollection,
  getOrderDetailsCollection,
  updateSingleOrderCollection,
  deleteOrderCollection,
}
