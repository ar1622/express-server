import express from 'express'
import { lessonRouter } from '../modules/lesson/lesson.router'
import { OrderRouter } from '../modules/order/order.router'
import { searchRouter } from '../modules/search/search.router'

const router = express.Router()

const allRoutes = [
  {
    path: '/lesson/',
    route: lessonRouter,
  },
  {
    path: '/order/',
    route: OrderRouter,
  },
  {
    path: '/search/',
    route: searchRouter,
  },
]

allRoutes.forEach(route => router.use(route?.path, route?.route))

export default router
