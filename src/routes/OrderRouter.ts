import express from 'express'
import OrderController from '../controllers/OrderController'
import { restrictedToRoles } from '../auth'
const OrderRouter = express.Router()

OrderRouter.post('/', restrictedToRoles('client'), express.json(), OrderController.create)

export default OrderRouter
