/* eslint-disable no-console */
import { Server } from 'http'
import { Collection, MongoClient } from 'mongodb'
import app from './app'
import config from './config'
import { ILesson } from './app/modules/lesson/lesson.interface'
import { IOrder } from './app/modules/order/order.interface'

let server: Server
const client = new MongoClient(config.mongoURI as string)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lessonCollection: Collection<ILesson>
let orderCollection: Collection<IOrder>


process.on('uncaughtException', error => {
  console.log('🔴 Uncaught exception is detected: ', error)
  process.exit(1)
})



async function main() {
  try {
    await client.connect()
    const database = client.db('userData')

    lessonCollection = database.collection<ILesson>('lessonCollection')
    orderCollection = database.collection<IOrder>('orderCollection')
    server = app.listen(config.port, () => {
      console.log(`🟢 Example app listening on port ${config.port}`)
    })

    console.log('🟢 Database connected successfully')
  } catch (error) {
    console.log('🔴 Something wrong here', error)
    process.exit(1)
  }
}

function stopServer() {
  if (server) {
    server.close(() => {
      client.close() // Close the MongoDB client when shutting down
      console.log('🔴 Server closed')
      process.exit(0)
    })
  }
}

process.on('unhandledRejection', error => {
  console.log('🔴 Unhandled rejection is detected: ', error)
  stopServer()
})

process.on('SIGTERM', () => {
  console.log('🔴 SIGTERM is detected. server closed..')
  stopServer()
})

main()
export {  lessonCollection, orderCollection }
