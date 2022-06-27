import express from 'express'
import { restrictedToRoles } from '../auth'
import MenuController from '../controllers/MenuController'
import paginate from '../utils/pagination'

const MenuRouter = express.Router()

/**
 * @api {post} /shop/api/menus/ Add a menu
 * @apiName AddOne
 * @apiGroup Menu
 *
 * @apiBody {String} name Name of the menu.
 * @apiBody {Number} price Price of the menu.
 * @apiBody {String} description Description of the menu.
 * @apiBody {String} image URL image of the menu.
 * @apiBody {String} restaurant Restaurant ID of the menu.
 * @apiBody {Array} products List of products contained in the menu.
 *
 *@apiExample {json} Request-Example:
 *    {
 *      "_id": "23TplPdS",
 *      "name": "Pizza Margherita and smoothie DOC",
 *      "price": 15.99,
 *      "description": "Delicious Margherita Pizza with one of our sweet smoothie.",
 *      "image": "shorturl.at/tfkJE",
 *      "restaurant": "46Juzcyx"
 *      "products": [
 *          {
 *              "_id": "2WEKaVNO",
 *              "name": "Pizza Margherita DOC",
 *              "price": 12.99,
 *              "description": "Made with tomato, buffalo mozzarella from Campania in fillets, basil and extra virgin olive oil",
 *              "image": "shorturl.at/fpuFJ",
 *              "restaurant": "46Juzcyx"
 *          },
 *          {
 *              "_id": "dogPzIz8",
 *              "name": "Banana smoothie DOC",
 *              "price": 5.99,
 *              "description": "Made with banana anf fresh milk",
 *              "image": "shorturl.at/zftDU",
 *              "restaurant": "46Juzcyx"
 *          }
 *      ]
 *    }
 *
 * @apiSuccess {String} name Name of the menu.
 * @apiSuccess {Number} price Price of the menu.
 * @apiSuccess {String} description Description of the menu.
 * @apiSuccess {String} image URL image of the menu.
 * @apiSuccess {String} restaurant Restaurant ID of the menu.
 * @apiSuccess {Array} products List of products contained in the menu.
 * @apiSuccess {String} _id Unique ID of the menu.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": "23TplPdS",
 *      "name": "Pizza Margherita and smoothie DOC",
 *      "price": 15.99,
 *      "description": "Delicious Margherita Pizza with one of our sweet smoothie.",
 *      "image": "shorturl.at/tfkJE",
 *      "restaurant": "46Juzcyx"
 *      "products": [
 *          {
 *              "_id": "2WEKaVNO",
 *              "name": "Pizza Margherita DOC",
 *              "price": 12.99,
 *              "description": "Made with tomato, buffalo mozzarella from Campania in fillets, basil and extra virgin olive oil",
 *              "image": "shorturl.at/fpuFJ",
 *              "restaurant": "46Juzcyx"
 *          },
 *          {
 *              "_id": "dogPzIz8",
 *              "name": "Banana smoothie DOC",
 *              "price": 5.99,
 *              "description": "Made with banana anf fresh milk",
 *              "image": "shorturl.at/zftDU",
 *              "restaurant": "46Juzcyx"
 *          }
 *      ]
 *    }
 *
 */
MenuRouter.post('/', restrictedToRoles('restaurateur'), express.json(), MenuController.create)

/**
/**
 * @api {get} /shop/api/menus/ Request Menus information
 * @apiName GetAll
 * @apiGroup Menu
 *
 * @apiSuccess {Number} count Number of products returned.
 * @apiSuccess {Array} results Array of products.
 * @apiSuccess {String} results.name Name of the menu.
 * @apiSuccess {Number} results.price Price of the menu.
 * @apiSuccess {String} results.description Description of the menu.
 * @apiSuccess {String} results.image URL image of the menu.
 * @apiSuccess {String} results.restaurant Restaurant ID of the menu.
 * @apiSuccess {Array} results.products List of products contained in the menu.
 * @apiSuccess {String} results._id Unique ID of the menu.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "count": "1",
 *      "results": [
 *          {
 *              "_id": "23TplPdS",
 *              "name": "Pizza Margherita and smoothie DOC",
 *              "price": 15.99,
 *              "description": "Delicious Margherita Pizza with one of our sweet smoothie.",
 *              "image": "shorturl.at/tfkJE",
 *              "restaurant": "46Juzcyx"
 *              "products": [
 *                  {
 *                      "_id": "2WEKaVNO",
 *                      "name": "Pizza Margherita DOC",
 *                      "price": 12.99,
 *                      "description": "Made with tomato, buffalo mozzarella from Campania in fillets, basil and extra virgin olive oil",
 *                      "image": "shorturl.at/fpuFJ",
 *                      "restaurant": "46Juzcyx"
 *                  },
 *                  {
 *                      "_id": "dogPzIz8",
 *                      "name": "Banana smoothie DOC",
 *                      "price": 5.99,
 *                      "description": "Made with banana anf fresh milk",
 *                      "image": "shorturl.at/zftDU",
 *                      "restaurant": "46Juzcyx"
 *                  }
 *              ]
 *          }
 *      ]
 *    }
 */
MenuRouter.get('/', paginate, MenuController.getAll)

/**
 * @api {get} /shop/api/menus/:id Request Menu information
 * @apiName GetOne
 * @apiGroup Menu
 *
 * @apiParam {String} id Menu unique ID.
 *
 * @apiSuccess {String} name Name of the menu.
 * @apiSuccess {Number} price Price of the menu.
 * @apiSuccess {String} description Description of the menu.
 * @apiSuccess {String} image URL image of the menu.
 * @apiSuccess {String} restaurant Restaurant ID of the menu.
 * @apiSuccess {Array} products List of products contained in the menu.
 * @apiSuccess {String} _id Unique ID of the menu.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": "23TplPdS",
 *      "name": "Pizza Margherita and smoothie DOC",
 *      "price": 15.99,
 *      "description": "Delicious Margherita Pizza with one of our sweet smoothie.",
 *      "image": "shorturl.at/tfkJE",
 *      "restaurant": "46Juzcyx"
 *      "products": [
 *          {
 *              "_id": "2WEKaVNO",
 *              "name": "Pizza Margherita DOC",
 *              "price": 12.99,
 *              "description": "Made with tomato, buffalo mozzarella from Campania in fillets, basil and extra virgin olive oil",
 *              "image": "shorturl.at/fpuFJ",
 *              "restaurant": "46Juzcyx"
 *          },
 *          {
 *              "_id": "dogPzIz8",
 *              "name": "Banana smoothie DOC",
 *              "price": 5.99,
 *              "description": "Made with banana anf fresh milk",
 *              "image": "shorturl.at/zftDU",
 *              "restaurant": "46Juzcyx"
 *          }
 *      ]
 *    }
 *
 * @apiError MenuNotFound The Menu was not found.
 */
MenuRouter.get('/:id', MenuController.getOne)

/**
 * @api {post} /shop/api/menus/:id Edit a menu
 * @apiName EditOne
 * @apiGroup Menu
 *
 * @apiParam {String} id Menu unique ID.
 *
 * @apiBody {String} [name] Name of the menu.
 * @apiBody {Number} [price] Price of the menu.
 * @apiBody {String} [description] Description of the menu.
 * @apiBody {String} [image] URL image of the menu.
 * @apiBody {String} [restaurant] Restaurant ID of the menu.
 * @apiBody {Array} [products] List of products contained in the menu.
 *
 *@apiExample {json} Request-Example:
 *    {
 *      "name": "Pizza Margherita with a smoothie DOC",
 *      "price": 13.99,
 *    }
 *
 * @apiSuccess {String} name Name of the menu.
 * @apiSuccess {Number} price Price of the menu.
 * @apiSuccess {String} description Description of the menu.
 * @apiSuccess {String} image URL image of the menu.
 * @apiSuccess {String} restaurant Restaurant ID of the menu.
 * @apiSuccess {Array} products List of products contained in the menu.
 * @apiSuccess {String} _id Unique ID of the menu.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": "23TplPdS",
 *      "name": "Pizza Margherita with a smoothie DOC",
 *      "price": 13.99,
 *      "description": "Delicious Margherita Pizza with one of our sweet smoothie.",
 *      "image": "shorturl.at/tfkJE",
 *      "restaurant": "46Juzcyx"
 *      "products": [
 *          {
 *              "_id": "2WEKaVNO",
 *              "name": "Pizza Margherita DOC",
 *              "price": 12.99,
 *              "description": "Made with tomato, buffalo mozzarella from Campania in fillets, basil and extra virgin olive oil",
 *              "image": "shorturl.at/fpuFJ",
 *              "restaurant": "46Juzcyx"
 *          },
 *          {
 *              "_id": "dogPzIz8",
 *              "name": "Banana smoothie DOC",
 *              "price": 5.99,
 *              "description": "Made with banana anf fresh milk",
 *              "image": "shorturl.at/zftDU",
 *              "restaurant": "46Juzcyx"
 *          }
 *      ]
 *    }
 *
 */
MenuRouter.patch('/:id', restrictedToRoles('restaurateur'), express.json(), MenuController.modify)

/**
 * @api {delete} /shop/api/menus/:id Delete desired menu
 * @apiName DeleteOne
 * @apiGroup Menu
 *
 * @apiParam {String} id Menu unique ID.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 204 OK
 *
 * @apiError MenuNotFound The Menu was not found.
 * @apiError MissingPermissions You are not the owner of this restaurant
 */
MenuRouter.delete('/:id', restrictedToRoles('restaurateur'), MenuController.remove)

export default MenuRouter
