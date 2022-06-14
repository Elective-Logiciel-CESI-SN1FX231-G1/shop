import express from 'express'
import RestaurantController from '../controllers/RestaurantController'
const RestaurantRouter = express.Router()

RestaurantRouter.post('/', express.json(), RestaurantController.create)

RestaurantRouter.get('/', RestaurantController.getAll)

RestaurantRouter.get('/:id', RestaurantController.getOne)

RestaurantRouter.patch('/:id', express.json(), RestaurantController.modify)

RestaurantRouter.delete('/:id', RestaurantController.remove)

export default RestaurantRouter
