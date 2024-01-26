import httpStatus from 'http-status'
import { ObjectId } from 'mongodb'
import ApiError from '../../../Errors/apiError'
import { lessonCollection, orderCollection } from '../../../server'
import { IOrder, IOrderResponse } from './order.interface'

// save new order information in the database
const saveNewOrderInformation = async (
  data: IOrder,
): Promise<IOrder | null> => {
  const result = await orderCollection.insertOne(data)

  if (!result.acknowledged) {
    throw new ApiError(400, 'Failed to create data!')
  }

  // Use the insertedId to find the created user
  const createdUser = await orderCollection.findOne({ _id: result.insertedId })
  return createdUser as IOrder | null
}

// get all order information from the database with populated lessons
const getAllOrder = async (): Promise<IOrderResponse[] | null> => {
  try {
    const allOrders = await orderCollection.find({}).toArray()

    if (allOrders.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')
    }

    const lessonIds = [...new Set(allOrders.flatMap(order => order.lessonIds))]
    const objectIds = lessonIds.map(id => new ObjectId(id))

    const lessons = await lessonCollection
      .find({ _id: { $in: objectIds } })
      .toArray()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapOrderWithLessons = (order: any) => {
      const filteredLessons = lessons.filter(lesson =>
        order.lessonIds.includes(String(lesson._id)),
      )
      return { ...order, lessonIds: filteredLessons }
    }

    const ordersWithLessons = allOrders.map(mapOrderWithLessons)

    return ordersWithLessons
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Internal Server Error',
    )
  }
}



// get single order information from the database with populated lessons
const getOrderDetails = async (
  orderId: string,
): Promise<IOrderResponse | null> => {
  const order = await orderCollection.findOne({ _id: new ObjectId(orderId) })

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')
  }

  // Extract all unique lessonIds from all orders
  const lessonIds = Array.from(new Set(order.lessonIds.flatMap(order => order)))
  const objectIds = lessonIds.map(id => new ObjectId(id))

  // Fetch all lessons that match the order's lessonIds
  const lessons = await lessonCollection
    .find({ _id: { $in: objectIds } })
    .toArray()

  // Populate the 'lessons' field in the order
  const orderWithLessons: IOrderResponse = {
    ...order,
    lessonIds: lessons,
  }

  return orderWithLessons
}

// update single order from the database
const updateOrder = async (
  orderId: string,
  data: Partial<IOrder>,
): Promise<IOrder | null> => {
  const result = await orderCollection.updateOne(
    { _id: new ObjectId(orderId) },
    { $set: data },
  )

  if (!result.acknowledged) {
    throw new ApiError(400, 'Failed to update data!')
  }

  const updatedOrder = await orderCollection.findOne({
    _id: new ObjectId(orderId),
  })
  return updatedOrder as IOrder | null
}

// delete a order from the database
const deleteOrder = async (orderId: string): Promise<IOrderResponse | null> => {
  const result = await orderCollection.deleteOne({ _id: new ObjectId(orderId) })

  if (!result.deletedCount) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')
  }

  return null
}

export const orderService = {
  saveNewOrderInformation,
  getAllOrder,
  getOrderDetails,
  deleteOrder,
  updateOrder,
}
