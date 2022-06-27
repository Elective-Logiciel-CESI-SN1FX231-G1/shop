import express from 'express'
import { restrictedToRoles } from '../auth'
import ProductController from '../controllers/ProductController'
import paginate from '../utils/pagination'

const ProductRouter = express.Router()

/**
 * @api {post} /shop/api/products/ Add a product
 * @apiName AddOne
 * @apiGroup Product
 *
 * @apiBody {String} name Name of the product.
 * @apiBody {Number} price Price of the product.
 * @apiBody {String} description Description of the product.
 * @apiBody {String} image URL image of the product.
 * @apiBody {String} restaurant Restaurant ID of the product.
 * @apiBody {String} _id Unique ID of the product.
 *
 *@apiExample {json} Request-Example:
 *    {
 *      "_id": "2WEKaVNO",
 *      "name": "Pizza Margherita DOC",
 *      "price": 12.99,
 *      "description": "Made with tomato, buffalo mozzarella from Campania in fillets, basil and extra virgin olive oil",
 *      "image": "shorturl.at/fpuFJ",
 *      "restaurant": "46Juzcyx"
 *    }
 *
 * @apiSuccess {String} name Name of the product.
 * @apiSuccess {Number} price Price of the product.
 * @apiSuccess {String} description Description of the product.
 * @apiSuccess {String} image URL image of the product.
 * @apiSuccess {String} restaurant Restaurant ID of the product.
 * @apiSuccess {String} _id Unique ID of the product.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": "2WEKaVNO",
 *      "name": "Pizza Margherita DOC",
 *      "price": 12.99,
 *      "description": "Made with tomato, buffalo mozzarella from Campania in fillets, basil and extra virgin olive oil",
 *      "image": "shorturl.at/fpuFJ",
 *      "restaurant": "46Juzcyx"
 *    }
 *
 */
ProductRouter.post('/', restrictedToRoles('restaurateur'), express.json(), ProductController.create)

/**
 * @api {get} /shop/api/products/ Request Products information
 * @apiName GetAll
 * @apiGroup Product
 *
 * @apiSuccess {Number} count Number of products returned.
 * @apiSuccess {Array} results Array of products.
 * @apiSuccess {String} results.name Name of the product.
 * @apiSuccess {Number} results.price Price of the product.
 * @apiSuccess {String} results.description Description of the product.
 * @apiSuccess {String} results.image URL image of the product.
 * @apiSuccess {String} results.restaurant Restaurant ID of the product.
 * @apiSuccess {String} results._id Unique ID of the product.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "count": "1",
 *      "results": [
 *          {
 *              "_id": "2WEKaVNO",
 *              "name": "Pizza Margherita DOC",
 *              "price": 12.99,
 *              "description": "Made with tomato, buffalo mozzarella from Campania in fillets, basil and extra virgin olive oil",
 *              "image": "shorturl.at/fpuFJ",
 *              "restaurant": "46Juzcyx"
 *          }
 *      ]
 *    }
 */
ProductRouter.get('/', paginate, ProductController.getAll)

/**
 * @api {get} /shop/api/products/:id Request Product information
 * @apiName GetOne
 * @apiGroup Product
 *
 * @apiParam {String} id Product unique ID.
 *
 * @apiSuccess {String} name Name of the product.
 * @apiSuccess {Number} price Price of the product.
 * @apiSuccess {String} description Description of the product.
 * @apiSuccess {String} image URL image of the product.
 * @apiSuccess {String} restaurant Restaurant ID of the product.
 * @apiSuccess {String} _id Unique ID of the product.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": "2WEKaVNO",
 *      "name": "Pizza Margherita DOC",
 *      "price": 12.99,
 *      "description": "Made with tomato, buffalo mozzarella from Campania in fillets, basil and extra virgin olive oil",
 *      "image": "shorturl.at/fpuFJ",
 *      "restaurant": "46Juzcyx"
 *    }
 *
 * @apiError ProductNotFound The Product was not found.
 */
ProductRouter.get('/:id', ProductController.getOne)

/**
 * @api {post} /shop/api/products/:id Edit a product
 * @apiName EditOne
 * @apiGroup Product
 *
 * @apiParam {String} id Product unique ID.
 *
 * @apiBody {String} [name] Name of the product.
 * @apiBody {Number} [price] Price of the product.
 * @apiBody {String} [description] Description of the product.
 * @apiBody {String} [image] URL image of the product.
 * @apiBody {String} [restaurant] Restaurant ID of the product.
 *
 *@apiExample {json} Request-Example:
 *    {
 *      "price": 10.99,
 *      "description": "Made with tomato, buffalo mozzarella from Campania in fillets, basil and extra virgin olive oil with extra cheese.",
 *    }
 *
 * @apiSuccess {String} name Name of the product.
 * @apiSuccess {Number} price Price of the product.
 * @apiSuccess {String} description Description of the product.
 * @apiSuccess {String} image URL image of the product.
 * @apiSuccess {String} restaurant Restaurant ID of the product.
 * @apiSuccess {String} _id Unique ID of the product.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": "2WEKaVNO",
 *      "name": "Pizza Margherita DOC",
 *      "price": 12.99,
 *      "description": "Made with tomato, buffalo mozzarella from Campania in fillets, basil and extra virgin olive oil",
 *      "image": "shorturl.at/fpuFJ",
 *      "restaurant": "46Juzcyx"
 *    }
 *
 */
ProductRouter.patch('/:id', restrictedToRoles('restaurateur'), express.json(), ProductController.modify)

/**
 * @api {delete} /shop/api/products/:id Delete desired product
 * @apiName DeleteOne
 * @apiGroup Product
 *
 * @apiParam {String} id Product unique ID.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 204 OK
 *
 * @apiError ProductNotFound The product was not found.
 * @apiError MissingPermissions You are not the owner of this restaurant
 */
ProductRouter.delete('/:id', restrictedToRoles('restaurateur'), ProductController.remove)

export default ProductRouter
