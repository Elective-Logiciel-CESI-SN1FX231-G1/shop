import { Handler } from 'express'
import ProductModel from '../models/ProductModel'
import MenuModel from '../models/MenuModel'
import RestaurantModel from '../models/RestaurantModel'
// import shortid from 'shortid'
// import OrderModel from '../models/OrderModel'

export const create: Handler = async (req, res) => {
  // Verify that the restaurant exists
  const Restaurant = await RestaurantModel.findOne({ _id: req.body.restaurant })
  if (!Restaurant) return res.status(404).send('No restaurant found')

  // Get the products & Verify for each that the product comes from the restaurant
  const Products = await ProductModel.find({ _id: { $in: req.body.products } })
  req.body.products = req.body.products.map((_id: string) => Products.find(p => p._id === _id))
  for (const Product of req.body.products) {
    if (!Product) return res.status(400).send('One or more product(s) were not found')
    if (Product.restaurant !== req.body.restaurant) return res.status(400).send('One or more product(s) are not sell by this restaurant')
  }

  // Get the Menus & Verify for each that the menu comes from the restaurant
  const Menus = await MenuModel.find({ _id: { $in: req.body.menus } })
  req.body.menus = req.body.menus.map((_id: string) => Menus.find(m => m._id === _id))
  for (const Menu of req.body.menus) {
    if (!Menu) return res.status(400).send('One or more menu(s) were not found')
    if (Menu.restaurant !== req.body.restaurant) return res.status(400).send('One or more menu(s) are not sell by this restaurant')
  }

  res.send(req.body)

  // const Orders = await OrderModel.find({ _id: { $in: req.body.Orders } })
  // req.body.Orders = req.body.Orders.map((_id: string) => Orders.find(p => p._id === _id))
  // const Menu = new MenuModel(req.body)
  // Menu._id = shortid()
  // try {
  //   await Menu.save()
  //   res.status(201).send(Menu)
  // } catch (err) {
  //   if (err instanceof Error && err.message) res.status(400).send(err.message)
  //   else throw err
  // }
}
export default {
  create
}
