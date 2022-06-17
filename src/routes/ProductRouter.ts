import express from 'express'
import { restrictedToRoles } from '../auth'
import ProductController from '../controllers/ProductController'
const ProductRouter = express.Router()

ProductRouter.post('/', restrictedToRoles('restaurateur'), express.json(), ProductController.create)

ProductRouter.get('/', ProductController.getAll)

ProductRouter.get('/:id', ProductController.getOne)

ProductRouter.patch('/:id', restrictedToRoles('restaurateur'), express.json(), ProductController.modify)

ProductRouter.delete('/:id', restrictedToRoles('restaurateur'), ProductController.remove)

export default ProductRouter
