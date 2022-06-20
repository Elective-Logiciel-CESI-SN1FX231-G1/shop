import { Handler } from 'express'
import ProductModel from '../models/ProductModel'
import MenuModel from '../models/MenuModel'
import shortid from 'shortid'
import RestaurantModel from '../models/RestaurantModel'

export const create: Handler = async (req, res) => {
  const ownerRestaurant = await RestaurantModel.findOne({ 'owner._id': req.user?._id }, { projection: { _id: 1 } })
  if (!ownerRestaurant) return res.status(400).send('User does not own a restaurant')
  req.body.restaurant = ownerRestaurant._id
  const Product = new ProductModel(req.body)
  Product._id = shortid()
  try {
    await Product.save()
    res.status(201).send(Product)
  } catch (err) {
    if (err instanceof Error && err.message) res.status(400).send(err.message)
    else throw err
  }
}

/**
 * @api {get} /products/ Request Products information
 * @apiName GetAll
 * @apiGroup Product
 *
 * @apiSuccess {String} name Name of the product.
 * @apiSuccess {Number} price Price of the product.
 * @apiSuccess {String} description Description of the product.
 * @apiSuccess {String} image URL image of the product.
 * @apiSuccess {String} restaurant Restaurant ID of the product.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": "62a9c327ce564c89d9a42339",
 *      "name": "Pizza Margherita DOC",
 *      "price": 12.99,
 *      "description": "Made with tomato, buffalo mozzarella from Campania in fillets, basil and extra virgin olive oil",
 *      "image": "shorturl.at/fpuFJ",
 *      "restaurant": "62a89eee75b4e01d540b8961"
 *    }
 *
 * @apiError ProductNotFound The id of the Product was not found.
 *
 * @apiErrorExample {404} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       Product Not Found
 *     }
 */
export const getAll: Handler = async (req, res) => {
}

/**
 * @api {get} /products/:id Request Product information
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
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": "62a9c327ce564c89d9a42339",
 *      "name": "Pizza Margherita DOC",
 *      "price": 12.99,
 *      "description": "Made with tomato, buffalo mozzarella from Campania in fillets, basil and extra virgin olive oil",
 *      "image": "shorturl.at/fpuFJ",
 *      "restaurant": "62a89eee75b4e01d540b8961"
 *    }
 *
 * @apiError ProductNotFound The id of the Product was not found.
 *
 * @apiErrorExample {404} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       Product Not Found
 *     }
 */
export const getOne: Handler = async (req, res) => {
  const Product = await ProductModel.findOne({ _id: req.params.id })
  if (Product) res.send(Product)
  else res.status(404).send('Product Not Found')
}

export const modify: Handler = async (req, res) => {
  const ownerRestaurant = await RestaurantModel.find({ 'owner._id': req.user?._id }, { projection: { _id: 1 } })
  if (ownerRestaurant.length === 0) return res.status(400).send('User does not own a restaurant')
  if (ownerRestaurant[0]._id === req.body.restaurant) {
    try {
      const Product = await ProductModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
      if (Product) res.send(Product)
      else res.status(404).send('Product Not Found')
    } catch (err) {
      if (err instanceof Error && err.message) res.status(400).send(err.message)
      else throw err
    }
  } else return res.status(404).send('You are not the owner of this restaurant')
}

export const remove: Handler = async (req, res) => {
  const ownerRestaurant = await RestaurantModel.findOne({ 'owner._id': req.user?._id }, { projection: { _id: 1 } })
  if (!ownerRestaurant) return res.status(400).send('User does not own a restaurant')
  const currentProduct = await ProductModel.findOne({ _id: req.params.id })
  if (!currentProduct) return res.status(400).send('Product does not exist')
  if (ownerRestaurant._id === currentProduct.restaurant) {
    const MenusContainingTheProduct = await MenuModel.find({ products: { $elemMatch: { _id: req.params.id } } })
    if (MenusContainingTheProduct.length === 0) {
      const Product = await ProductModel.deleteOne({ _id: req.params.id })
      if (Product.deletedCount) res.send(Product)
      else res.status(404).send('Product Not found')
    } else {
      res.status(400).send('Product Cannot Be Deleted because it\'s used in some menu(s)')
    }
  } else res.status(404).send('You are not the owner of this restaurant')
}

export default {
  create,
  getAll,
  getOne,
  modify,
  remove
}
