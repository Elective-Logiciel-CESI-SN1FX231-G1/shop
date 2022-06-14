import express from 'express'
import ProductController from '../controllers/ProductController'
const ProductRouter = express.Router()

ProductRouter.post('/', express.json(), ProductController.create)

ProductRouter.get('/', ProductController.getAll)

ProductRouter.get('/:id', ProductController.getOne)

ProductRouter.patch('/:id', express.json(), ProductController.modify)

ProductRouter.delete('/:id', ProductController.remove)

export default ProductRouter
