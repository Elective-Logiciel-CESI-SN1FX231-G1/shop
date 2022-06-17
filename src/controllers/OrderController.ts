import { Handler } from 'express'
import ProductModel from '../models/ProductModel'
import MenuModel from '../models/MenuModel'
import RestaurantModel from '../models/RestaurantModel'
import client from '../mqtt'

export const create: Handler = async (req, res) => {
  let commandPrice = 0

  // Verify that the restaurant exists
  const Restaurant = await RestaurantModel.findOne({ _id: req.body.restaurant })
  if (!Restaurant) return res.status(404).send('No restaurant found')

  // Get the products & Verify for each that the product comes from the restaurant
  const Products = await ProductModel.find({ _id: { $in: req.body.products } })
  req.body.products = req.body.products.map((_id: string) => Products.find(p => p._id === _id))
  for (const Product of req.body.products) {
    if (!Product) return res.status(400).send('One or more product(s) were not found')
    if (Product.restaurant !== req.body.restaurant) return res.status(400).send('One or more product(s) are not sell by this restaurant')
    commandPrice += Product.price
  }

  // Get the Menus & Verify for each that the menu comes from the restaurant
  const Menus = await MenuModel.find({ _id: { $in: req.body.menus } })
  req.body.menus = req.body.menus.map((_id: string) => Menus.find(m => m._id === _id))
  for (const Menu of req.body.menus) {
    if (!Menu) return res.status(400).send('One or more menu(s) were not found')
    if (Menu.restaurant !== req.body.restaurant) return res.status(400).send('One or more menu(s) are not sell by this restaurant')
    commandPrice += Menu.price
  }

  // Get the user
  if (!req.user) return res.status(400).send('User not authenticated')

  req.body.price = commandPrice
  req.body.deliveryPrice = 5
  req.body.commissionPrice = 3
  req.body.restaurant = Restaurant
  req.body.client = req.user

  res.status(201).send(req.body)

  client.publish('shop/orders', JSON.stringify(req.body))
}

export default {
  create
}
