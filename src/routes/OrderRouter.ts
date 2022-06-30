import express from 'express'
import OrderController from '../controllers/OrderController'
import { restrictedToRoles } from '../auth'
const OrderRouter = express.Router()

/**
 * @api {post} /shop/api/orders/ Add an order
 * @apiName AddOne
 * @apiGroup Order
 *
 * @apiBody {Array} products List of products.
 * @apiBody {Array} menus List of menus.
 * @apiBody {String} restaurant Restaurant ID of the order.
 * @apiBody {String} comment Comment of the user.
 * @apiBody {String} address Address of the client.
 * @apiBody {Object} position Longitude and latitude of the client.
 * @apiBody {String} coupon Coupon code of the user.
 *
 * @apiExample {json} Request-Example:
 *  {
 *      "products": ["tBmfGjVbB"],
 *      "menus": [""],
 *      "restaurant": "6A1tVGhHG",
 *      "comment": "Ceci est ma commande",
 *      "address": "100 boulevard de la mère patrie",
 *      "position": {
 *          "lon": 12,
 *          "lat": 12
 *      },
 *      "coupon": "ZGs8ZAFRnS"
 * }
 *
 * @apiSuccess {Array} products List of products.
 * @apiSuccess {Array} menus List of menus.
 * @apiSuccess {Object} restaurant Restaurant information of the order.
 * @apiSuccess {String} comment Comment of the user.
 * @apiSuccess {String} address Address of the client.
 * @apiSuccess {Object} position Longitude and latitude of the client.
 * @apiSuccess {String} coupon Coupon code of the user.
 * @apiSuccess {Number} price Price of the order.
 * @apiSuccess {Number} deliveryPrice Price of the delivery.
 * @apiSuccess {Number} comissionPrice Price of the comission.
 * @apiSuccess {Object} client Client information of the order.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * {
 *      "products": [
 *          {
 *              "_id": "tBmfGjVbB",
 *              "name": "Plat - Restaurant 3",
 *              "price": 19.99,
 *              "description": "Plat de sushi",
 *              "image": "link",
 *              "restaurant": "6A1tVGhHG",
 *              "__v": 0
 *          }
 *      ],
 *      "menus": [
 *          ""
 *      ],
 *      "restaurant": {
 *          "owner": {
 *              "_id": "Wp4vULfGv",
 *              "firstname": "Restaurant - 2",
 *              "lastname": "Test",
 *              "phone": "0606060606",
 *              "email": "2@restaurateur.com",
 *              "role": "restaurateur"
 *          },
 *          "position": {
 *              "lon": 15,
 *              "lat": 15
 *          },
 *          "_id": "6A1tVGhHG",
 *          "name": "Restaurant 2",
 *          "description": "string",
 *          "address": "string",
 *          "openingHours": [
 *              {
 *                  "from": "1970-01-01T00:00:00.012Z",
 *                  "to": "1970-01-01T00:00:00.012Z",
 *                  "_id": "62ad989ceb8587569c264d51"
 *              }
 *          ],
 *          "types": [
 *              "Array<string>"
 *          ],
 *          "isClosed": false,
 *          "__v": 0,
 *          "couponDate": "2022-07-18T09:26:43.105Z",
 *          "image": "shorturl.at/fldOI"
 *      },
 *      "comment": "Ceci est ma commande",
 *      "address": "100 boulevard de la mÃ¨re patrie",
 *      "position": {
 *           "lon": 12,
 *          "lat": 12
 *      },
 *      "coupon": "",
 *      "price": 19.99,
 *      "deliveryPrice": 5,
 *      "commissionPrice": 3,
 *      "client": {
 *          "_id": "ATqLhA3i2",
 *          "firstname": "Client - 2",
 *          "lastname": "Test",
 *          "email": "2@client.com",
 *          "phone": "0606060606",
 *          "role": "client",
 *          "iat": 1655544747
 *      }
 * }
 *
 */
OrderRouter.post('/', restrictedToRoles('client'), express.json(), OrderController.create)

export default OrderRouter
