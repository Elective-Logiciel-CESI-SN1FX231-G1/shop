import express from 'express'
import { restrictedToRoles } from '../auth'
import RestaurantController from '../controllers/RestaurantController'
import paginate from '../utils/pagination'

const RestaurantRouter = express.Router()

/**
 * @api {post} /shop/api/restaurants/ Add a restaurant
 * @apiName AddOne
 * @apiGroup Restaurant
 *
 * @apiBody {Object} owner Object containing owner information of the Restaurant.
 * @apiBody {Object} position Object containing position information of the Restaurant.
 * @apiBody {String} _id Unique ID of the Restaurant.
 * @apiBody {String} name Name of the Restaurant.
 * @apiBody {String} description Description of the Restaurant.
 * @apiBody {String} address Address of the Restaurant.
 * @apiBody {Object} openingHours Object containing the opening hours of the Restaurant.
 * @apiBody {Array} types Array of foods types.
 * @apiBody {Boolean} isClosed boolean indicating if the Restaurant is closed.
 *
 *@apiExample {json} Request-Example:
 *    {
 *      "owner": {
 *        "firstName": "John",
 *        "lastName": "Doe",
 *        "phone": "0607080901",
 *        "email": "john.doe@example.com"
 *      },
 *      "position": {
 *        "lon": 47.285091,
 *        "lat": -2.399054
 *      },
 *      "_id": "46Juzcyx",
 *      "name": "Ban Sushi",
 *      "description": "A fabulous restaurant with great sushis",
 *      "address": "170 Avenue du Maréchal de Lattre de Tassigny, La Baule-Escoublac, France",
 *      "openingHours": [
 *        {
 *          "from": "1970-01-01T00:00:00.012Z",
 *          "to": "1970-01-01T00:00:00.012Z",
 *          "_id": "62a89eee75b4e01d540b8962"
 *        }
 *      ],
 *      "types": [
 *        "Sushi"
 *      ],
 *      "isClosed": false,
 *    }
 *
 * @apiSuccess {Object} owner Object containing owner information of the Restaurant.
 * @apiSuccess {Object} position Object containing position information of the Restaurant.
 * @apiSuccess {String} _id Unique ID of the Restaurant.
 * @apiSuccess {String} name Name of the Restaurant.
 * @apiSuccess {String} description Description of the Restaurant.
 * @apiSuccess {String} address Address of the Restaurant.
 * @apiSuccess {Object} openingHours Object containing the opening hours of the Restaurant.
 * @apiSuccess {Array} types Array of foods types.
 * @apiSuccess {Boolean} isClosed boolean indicating if the Restaurant is closed.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "owner": {
 *        "firstName": "John",
 *        "lastName": "Doe",
 *        "phone": "0607080901",
 *        "email": "john.doe@example.com"
 *      },
 *      "position": {
 *        "lon": 47.285091,
 *        "lat": -2.399054
 *      },
 *      "_id": "46Juzcyx",
 *      "name": "Ban Sushi",
 *      "description": "A fabulous restaurant with great sushis",
 *      "address": "170 Avenue du Maréchal de Lattre de Tassigny, La Baule-Escoublac, France",
 *      "openingHours": [
 *        {
 *          "from": "1970-01-01T00:00:00.012Z",
 *          "to": "1970-01-01T00:00:00.012Z",
 *          "_id": "62a89eee75b4e01d540b8962"
 *        }
 *      ],
 *      "types": [
 *        "Sushi"
 *      ],
 *      "isClosed": false,
 *    }
 *
 */
RestaurantRouter.post('/', restrictedToRoles('restaurateur'), express.json(), RestaurantController.create)

/**
 * @api {get} /shop/api/restaurants/ Request Restaurants information
 * @apiName GetAll
 * @apiGroup Restaurant
 *
 * @apiQuery {Number} size=10 Number of elements per page.
 * @apiQuery {Number} skip=0 Number of elements to skip.
 * @apiQuery {Number} page=1 The page to get.
 *
 * @apiSuccess {Number} count Number of restaurants returned.
 * @apiSuccess {Array} results Array of restaurants.
 * @apiSuccess {Object} results.owner Object containing owner information of the Restaurant.
 * @apiSuccess {Object} results.position Object containing position information of the Restaurant.
 * @apiSuccess {String} results._id Unique ID of the Restaurant.
 * @apiSuccess {String} results.name Name of the Restaurant.
 * @apiSuccess {String} results.description Description of the Restaurant.
 * @apiSuccess {String} results.address Address of the Restaurant.
 * @apiSuccess {Object} results.openingHours Object containing the opening hours of the Restaurant.
 * @apiSuccess {Array} results.types Array of foods types.
 * @apiSuccess {Boolean} results.isClosed boolean indicating if the Restaurant is closed.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "count": "1",
 *      "results": [
 *          {
 *              "owner": {
 *                "firstName": "John",
 *                "lastName": "Doe",
 *                "phone": "0607080901",
 *                "email": "john.doe@example.com"
 *              },
 *              "position": {
 *                "lon": 47.285091,
 *                "lat": -2.399054
 *              },
 *              "_id": "62a89eee75b4e01d540b8961",
 *              "name": "Ban Sushi",
 *              "description": "A fabulous restaurant with great sushis",
 *              "address": "170 Avenue du Maréchal de Lattre de Tassigny, La Baule-Escoublac, France",
 *              "openingHours": [
 *                {
 *                  "from": "1970-01-01T00:00:00.012Z",
 *                  "to": "1970-01-01T00:00:00.012Z",
 *                  "_id": "62a89eee75b4e01d540b8962"
 *                }
 *              ],
 *              "types": [
 *                "Sushi"
 *              ],
 *              "isClosed": false,
 *          }
 *      ]
 *    }
 */
RestaurantRouter.get('/', paginate, RestaurantController.getAll)

/**
 * @api {get} /shop/api/restaurants/:id Request Restaurant information
 * @apiName GetOne
 * @apiGroup Restaurant
 *
 * @apiParam {String} id Restaurant unique ID.
 *
 * @apiSuccess {Object} owner Object containing owner information of the Restaurant.
 * @apiSuccess {Object} position Object containing position information of the Restaurant.
 * @apiSuccess {String} _id Unique ID of the Restaurant.
 * @apiSuccess {String} name Name of the Restaurant.
 * @apiSuccess {String} description Description of the Restaurant.
 * @apiSuccess {String} address Address of the Restaurant.
 * @apiSuccess {Object} openingHours Object containing the opening hours of the Restaurant.
 * @apiSuccess {Array} types Array of foods types.
 * @apiSuccess {Boolean} isClosed boolean indicating if the Restaurant is closed.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "owner": {
 *        "firstName": "John",
 *        "lastName": "Doe",
 *        "phone": "0607080901",
 *        "email": "john.doe@example.com"
 *      },
 *      "position": {
 *        "lon": 47.285091,
 *        "lat": -2.399054
 *      },
 *      "_id": "46Juzcyx",
 *      "name": "Ban Sushi",
 *      "description": "A fabulous restaurant with great sushis",
 *      "address": "170 Avenue du Maréchal de Lattre de Tassigny, La Baule-Escoublac, France",
 *      "openingHours": [
 *        {
 *          "from": "1970-01-01T00:00:00.012Z",
 *          "to": "1970-01-01T00:00:00.012Z",
 *          "_id": "62a89eee75b4e01d540b8962"
 *        }
 *      ],
 *      "types": [
 *        "Sushi"
 *      ],
 *      "isClosed": false,
 *    }
 *
 * @apiError RestaurantNotFound The Restaurant was not found.
 */
RestaurantRouter.get('/:id', RestaurantController.getOne)

/**
 * @api {patch} /shop/api/restaurants/:id Edit a restaurant
 * @apiName EditOne
 * @apiGroup Restaurant
 *
 * @apiParam {String} id Unique ID of the Restaurant.
 *
 * @apiBody {Object} [owner] Object containing owner information of the Restaurant.
 * @apiBody {Object} [position] Object containing position information of the Restaurant.
 * @apiBody {String} [name] Name of the Restaurant.
 * @apiBody {String} [description] Description of the Restaurant.
 * @apiBody {String} [address] Address of the Restaurant.
 * @apiBody {Object} [openingHours] Object containing the opening hours of the Restaurant.
 * @apiBody {Array} [types] Array of foods types.
 * @apiBody {Boolean} [isClosed] boolean indicating if the Restaurant is closed.
 *
 * @apiExample {json} Request-Example:
 *    {
 *      "name": "Super Sushi",
 *      "description": "A wonderful restaurant with great sushis",
 *    }
 *
 * @apiSuccess {Object} owner Object containing owner information of the Restaurant.
 * @apiSuccess {Object} position Object containing position information of the Restaurant.
 * @apiSuccess {String} _id Unique ID of the Restaurant.
 * @apiSuccess {String} name Name of the Restaurant.
 * @apiSuccess {String} description Description of the Restaurant.
 * @apiSuccess {String} address Address of the Restaurant.
 * @apiSuccess {Object} openingHours Object containing the opening hours of the Restaurant.
 * @apiSuccess {Array} types Array of foods types.
 * @apiSuccess {Boolean} isClosed boolean indicating if the Restaurant is closed.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "owner": {
 *        "firstName": "John",
 *        "lastName": "Doe",
 *        "phone": "0607080901",
 *        "email": "john.doe@example.com"
 *      },
 *      "position": {
 *        "lon": 47.285091,
 *        "lat": -2.399054
 *      },
 *      "_id": "46Juzcyx",
 *      "name": "Super Sushi",
 *      "description": "A wonderful restaurant with great sushis",
 *      "address": "170 Avenue du Maréchal de Lattre de Tassigny, La Baule-Escoublac, France",
 *      "openingHours": [
 *        {
 *          "from": "1970-01-01T00:00:00.012Z",
 *          "to": "1970-01-01T00:00:00.012Z",
 *          "_id": "62a89eee75b4e01d540b8962"
 *        }
 *      ],
 *      "types": [
 *        "Sushi"
 *      ],
 *      "isClosed": false,
 *    }
 *
 */
RestaurantRouter.patch('/:id', restrictedToRoles('restaurateur'), express.json(), RestaurantController.modify)

/**
 * @api {delete} /shop/api/restaurants/:id Delete desired restaurant
 * @apiName DeleteOne
 * @apiGroup Restaurant
 *
 * @apiParam {String} id Restaurant unique ID.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 204 OK
 *
 * @apiError MenuNotFound The restaurant was not found.
 * @apiError MissingPermissions You are not the owner of this restaurant
 */
RestaurantRouter.delete('/:id', restrictedToRoles('restaurateur'), RestaurantController.remove)

export default RestaurantRouter
