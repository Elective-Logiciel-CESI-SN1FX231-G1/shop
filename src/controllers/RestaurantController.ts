import { Handler } from 'express'
import RestaurantModel from '../models/RestaurantModel'
import shortid from 'shortid'
import { User } from '../auth'
import MenuModel from '../models/MenuModel'
import ProductModel from '../models/ProductModel'

export const create: Handler = async (req, res) => {
  req.body.owner = req.user
  const Restaurant = new RestaurantModel(req.body)
  Restaurant._id = shortid()
  try {
    await Restaurant.save()
    res.status(201).send(Restaurant)
  } catch (err) {
    if (err instanceof Error && err.message) res.status(400).send(err.message)
    else throw err
  }
}

export const getAll: Handler = async (req, res) => {
  const Restaurants = await RestaurantModel.find()
  res.send(Restaurants)
}

/**
 * @api {get} /restaurants/:id Request Restaurant information
 * @apiName GetOne
 * @apiGroup Restaurant
 *
 * @apiParam {String} id Restaurant unique ID.
 *
 * @apiSuccess {Object} owner Object containing owner information of the Restaurant.
 * @apiSuccess {String} owner.firstname First name of the owner.
 * @apiSuccess {String} owner.lastname Last name of the owner.
 * @apiSuccess {String} owner.phone Phone number of the owner.
 * @apiSuccess {String} owner.email Email of the owner.
 * @apiSuccess {Object} position Object containing position information of the Restaurant.
 * @apiSuccess {Number} position.lon Longitude of the Restaurant location.
 * @apiSuccess {Number} position.lat Latitude of the Restaurant location.
 * @apiSuccess {String} _id Unique ID of the Restaurant.
 * @apiSuccess {String} name Name of the Restaurant.
 * @apiSuccess {String} description Description of the Restaurant.
 * @apiSuccess {String} address Address of the Restaurant.
 * @apiSuccess {Object} openingHours Object containing the opening hours of the Restaurant.
 * @apiSuccess {Date} openingHours.from Date of the opening hours.
 * @apiSuccess {Date} openingHours.to Date of the closing hours.
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
 *      "_id": "62a89eee75b4e01d540b8961",
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
 * @apiError RestaurantNotFound The id of the Restaurant was not found.
 *
 * @apiErrorExample {404} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       Restaurant Not Found
 *     }
 */
export const getOne: Handler = async (req, res) => {
  const Restaurant = await RestaurantModel.findOne({ _id: req.params.id })
  if (Restaurant) res.send(Restaurant)
  else res.status(404).send('Restaurant Not Found')
}

export const modify: Handler = async (req, res) => {
  const ownerRestaurant = await RestaurantModel.find({ 'owner._id': req.user?._id }, { projection: { _id: 1 } })
  if (ownerRestaurant.length === 0) return res.status(400).send('User doesn\'t own a restaurant')
  if (ownerRestaurant[0]._id !== req.params.id) return res.status(400).send('You are not the owner of this restaurant')
  req.body.owner = req.user
  try {
    const Restaurant = await RestaurantModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    if (Restaurant) res.send(Restaurant)
    else res.status(404).send('Restaurant Not Found')
  } catch (err) {
    if (err instanceof Error && err.message) res.status(400).send(err.message)
    else throw err
  }
}

export const remove: Handler = async (req, res) => {
  const ownerRestaurant = await RestaurantModel.find({ 'owner._id': req.user?._id }, { projection: { _id: 1 } })
  if (ownerRestaurant.length === 0) return res.status(400).send('User doesn\'t own a restaurant')
  if (ownerRestaurant[0]._id === req.params.id) {
    const Restaurant = await RestaurantModel.deleteOne({ _id: req.params.id })
    if (Restaurant.deletedCount) res.sendStatus(204)
    else res.status(404).send('Restaurant Not Found')
  } return res.status(400).send('You are not the owner of this restaurant')
}

export const processAccountUpdate = async (editedUser: User) => {
  if (editedUser.role === 'restaurateur') {
    await RestaurantModel.findOneAndUpdate(
      { 'owner._id': editedUser._id },
      {
        $set: {
          'owner.firstname': editedUser.firstname,
          'owner.lastName': editedUser.lastname,
          'owner.email': editedUser.email,
          'owner.phone': editedUser.phone,
          'owner.role': editedUser.role
        }
      },
      { new: true }
    )
  }
}

export const processAccountDelete = async (userId: String) => {
  const restaurantToDelete = await RestaurantModel.findOne({ 'owner._id': userId })
  if (restaurantToDelete) {
    await MenuModel.deleteMany({ restaurant: restaurantToDelete._id })
    await ProductModel.deleteMany({ restaurant: restaurantToDelete._id })
    await RestaurantModel.deleteOne({ _id: restaurantToDelete._id })
  }
}

export default {
  create,
  getAll,
  getOne,
  modify,
  remove,
  processAccountUpdate,
  processAccountDelete
}
