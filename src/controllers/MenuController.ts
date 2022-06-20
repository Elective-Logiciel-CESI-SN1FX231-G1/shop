import { Handler } from 'express'
import MenuModel from '../models/MenuModel'
import shortid from 'shortid'
import ProductModel from '../models/ProductModel'
import RestaurantModel from '../models/RestaurantModel'

export const create: Handler = async (req, res) => {
  const Restaurant = await RestaurantModel.findOne({ 'owner._id': req.user?._id }, { projection: { _id: 1 } })
  if (!Restaurant) return res.status(400).send('User does not own a restaurant')
  req.body.restaurant = Restaurant._id

  const Products = await ProductModel.find({ _id: { $in: req.body.products } })
  req.body.products = (req.body.products || []).map((_id: string) => Products.find(p => p._id === _id))

  for (const Product of req.body.products) {
    if (!Product) return res.status(400).send('One or more product(s) is not found')
    if (Product.restaurant !== req.body.restaurant) return res.status(400).send('One or more product(s) are not sell by this restaurant')
  }
  const Menu = new MenuModel(req.body)
  Menu._id = shortid()
  try {
    await Menu.save()
    res.status(201).send(Menu)
  } catch (err) {
    if (err instanceof Error && err.message) res.status(400).send(err.message)
    else throw err
  }
}

export const getAll: Handler = async (req, res) => {
  const query = {}
  const [results, count] = await Promise.all([
    MenuModel.find(query).skip(req.pagination.skip).limit(req.pagination.size).exec(),
    MenuModel.countDocuments(query).exec()
  ])
  res.send({
    count,
    results
  })
}

export const getOne: Handler = async (req, res) => {
  const Menu = await MenuModel.findOne({ _id: req.params.id })
  if (Menu) res.send(Menu)
  else res.status(404).send('Menu Not Found')
}

export const modify: Handler = async (req, res) => {
  const ownerRestaurant = await RestaurantModel.find({ 'owner._id': req.user?._id }, { projection: { _id: 1 } })
  if (ownerRestaurant.length === 0) return res.status(400).send('User does not own a restaurant')
  if (ownerRestaurant[0]._id === req.body.restaurant) {
    try {
      const Products = await ProductModel.find({ _id: { $in: req.body.products } })
      req.body.products = req.body.products.map((_id: string) => Products.find(p => p._id === _id))
      for (const Product of req.body.products) {
        if (!Product) return res.status(400).send('One or more product(s) are not found')
        if (Product.restaurant !== req.body.restaurant) return res.status(400).send('One or more product(s) are not sell by this restaurant')
      }

      const Menu = await MenuModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
      if (Menu) res.send(Menu)
      else res.status(404).send('Menu Not Found')
    } catch (err) {
      if (err instanceof Error && err.message) res.status(400).send(err.message)
      else throw err
    }
  } else return res.status(400).send('You are not the owner of this restaurant')
}

export const remove: Handler = async (req, res) => {
  const ownerRestaurant = await RestaurantModel.find({ 'owner._id': req.user?._id }, { projection: { _id: 1 } })
  if (ownerRestaurant.length === 0) return res.status(400).send('User does not own a restaurant')
  const RestaurantMenu = await MenuModel.findOne({ _id: req.params.id })
  if (!RestaurantMenu) return res.status(404).send('Menu Not found')

  if (ownerRestaurant[0]._id === RestaurantMenu.restaurant) {
    const Menu = await MenuModel.deleteOne({ _id: req.params.id })
    if (Menu.deletedCount) res.send(Menu)
  } else return res.status(400).send('You are not the owner of this restaurant')
}

export default {
  create,
  getAll,
  getOne,
  modify,
  remove
}
