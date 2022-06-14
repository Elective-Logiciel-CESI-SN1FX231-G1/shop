import express from 'express'
import restaurantController from '../controllers/RestaurantController'
const restaurantRouter = express.Router()

restaurantRouter.post('/', express.json(), restaurantController.create)

restaurantRouter.get('/', restaurantController.getAll)

restaurantRouter.get('/:id', restaurantController.getOne)

restaurantRouter.patch('/:id', express.json(), restaurantController.modify)

restaurantRouter.delete('/:id', restaurantController.remove)

export default restaurantRouter
