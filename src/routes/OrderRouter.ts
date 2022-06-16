import express from 'express'
import OrderController from '../controllers/OrderController'
const OrderRouter = express.Router()

OrderRouter.post('/', express.json(), OrderController.create)

export default OrderRouter
