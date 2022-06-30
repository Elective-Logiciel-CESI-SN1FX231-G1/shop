import { Handler } from 'express'
import ProductModel from '../models/ProductModel'
import MenuModel from '../models/MenuModel'
import shortid from 'shortid'
import RestaurantModel, { IRestaurant } from '../models/RestaurantModel'
import { FilterQuery } from 'mongoose'

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

export const getAll: Handler = async (req, res) => {
  const query :FilterQuery<IRestaurant> = {}
  if (req.query.q) query.$text = { $search: String(req.query.q) }
  if (req.query.restaurant) query.restaurant = req.query.restaurant
  if (req.user?.role === 'restaurateur') query.restaurant = (await RestaurantModel.findOne({ 'owner._id': req.user._id }).exec())?._id || ''
  const [results, count] = await Promise.all([
    ProductModel.find(query).skip(req.pagination.skip).limit(req.pagination.size).exec(),
    ProductModel.countDocuments(query).exec()
  ])
  res.send({
    count,
    results
  })
}

export const getOne: Handler = async (req, res) => {
  const Product = await ProductModel.findOne({ _id: req.params.id })
  if (Product) res.send(Product)
  else res.status(404).send('Product Not Found')
}

export const modify: Handler = async (req, res) => {
  const ownerRestaurant = await RestaurantModel.findOne({ 'owner._id': req.user?._id }, { projection: { _id: 1 } })
  if (!ownerRestaurant) return res.status(400).send('User does not own a restaurant')
  const currentProduct = await ProductModel.findOne({ _id: req.params.id })
  if (!currentProduct) return res.status(404).send('Product does not exist')
  if (ownerRestaurant._id === currentProduct.restaurant) {
    try {
      const Product = await ProductModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
      if (!Product) return res.sendStatus(404)
      const menusWithProduct = await MenuModel.find({ 'products._id': Product._id, restaurant: Product.restaurant })
      for (const menu of menusWithProduct) {
        menu.products = menu.products.map((p: any) => {
          if (p._id === currentProduct._id) return Product
          else return p
        }) as any[]
        await menu.save()
      }
      res.send(Product)
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
  if (!currentProduct) return res.status(404).send('Product does not exist')
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
