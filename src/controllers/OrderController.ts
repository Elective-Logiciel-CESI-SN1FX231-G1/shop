import { Handler } from 'express'
import ProductModel from '../models/ProductModel'
import MenuModel from '../models/MenuModel'
import RestaurantModel from '../models/RestaurantModel'
import CouponModel from '../models/CouponModel'
import client from '../mqtt'

function padTo2Digits (num: Number) {
  return num.toString().padStart(2, '0')
}

function formatDate (date: Date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getUTCMonth() + 1),
      padTo2Digits(date.getUTCDate())
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getUTCHours() + 2),
      padTo2Digits(date.getUTCMinutes()),
      padTo2Digits(date.getUTCSeconds())
    ].join(':')
  )
}

export const create: Handler = async (req, res) => {
  let commandPrice = 0

  // Verify that the restaurant exists
  const Restaurant = await RestaurantModel.findOne({ _id: req.body.restaurant })
  if (!Restaurant) return res.status(404).send('No restaurant found')

  // Get the products & Verify for each that the product comes from the restaurant
  const Products = await ProductModel.find({ _id: { $in: req.body.products } })
  if (Products.length > 0) {
    req.body.products = req.body.products.map((_id: string) => Products.find(p => p._id === _id))
    for (const Product of req.body.products) {
      if (!Product) return res.status(400).send('One or more product(s) were not found')
      if (Product.restaurant !== req.body.restaurant) return res.status(400).send('One or more product(s) are not sell by this restaurant')
      commandPrice += Product.price
    }
  }

  // Get the Menus & Verify for each that the menu comes from the restaurant
  const Menus = await MenuModel.find({ _id: { $in: req.body.menus } })
  if (Menus.length > 0) {
    req.body.menus = req.body.menus.map((_id: string) => Menus.find(m => m._id === _id))
    for (const Menu of req.body.menus) {
      if (!Menu) return res.status(400).send('One or more menu(s) were not found')
      if (Menu.restaurant !== req.body.restaurant) return res.status(400).send('One or more menu(s) are not sell by this restaurant')
      commandPrice += Menu.price
    }
  }

  // Check if a coupon has been used
  if (req.body.coupon) {
    const ClientCoupon = await CouponModel.findOne({ _id: req.body.coupon })
    if (!ClientCoupon) return res.status(404).send('Coupon not found')
    if (ClientCoupon.isUsed) return res.status(400).send('Coupon has already been used')
    await CouponModel.findOneAndUpdate(
      { _id: req.body.coupon },
      { $set: { date: new Date(), isUsed: true } },
      { new: true })
    // 30% reduction
    commandPrice = Number((commandPrice - commandPrice * 0.3).toFixed(2))
  }

  req.body.price = commandPrice
  req.body.deliveryPrice = 5
  req.body.commissionPrice = 3
  req.body.restaurant = Restaurant
  req.body.client = req.user

  req.body.deliveringDate = formatDate(new Date())

  res.status(201).send(req.body)

  client.publish('shop/orders', JSON.stringify(req.body))
}

export default {
  create
}
