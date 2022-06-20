import express from 'express'
import { restrictedToRoles } from '../auth'
import RestaurantController from '../controllers/RestaurantController'
import paginate from '../utils/pagination'

const RestaurantRouter = express.Router()

RestaurantRouter.post('/', restrictedToRoles('restaurateur'), express.json(), RestaurantController.create)

RestaurantRouter.get('/', paginate, RestaurantController.getAll)

RestaurantRouter.get('/:id', RestaurantController.getOne)

RestaurantRouter.patch('/:id', restrictedToRoles('restaurateur'), express.json(), RestaurantController.modify)

RestaurantRouter.delete('/:id', restrictedToRoles('restaurateur'), RestaurantController.remove)

export default RestaurantRouter
