import { Handler } from 'express'
import MenuModel from '../models/MenuModel'
import shortid from 'shortid'
import ProductModel from '../models/ProductModel'

export const create: Handler = async (req, res) => {
  const Products = await ProductModel.find({ _id: { $in: req.body.products } })
  req.body.products = req.body.products.map((_id: string) => Products.find(p => p._id === _id))
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
  const Menus = await MenuModel.find()
  res.send(Menus)
}

export const getOne: Handler = async (req, res) => {
  const Menu = await MenuModel.findOne({ _id: req.params.id })
  if (Menu) res.send(Menu)
  else res.status(404).send('Menu Not Found')
}

export const modify: Handler = async (req, res) => {
  try {
    const Products = await ProductModel.find({ _id: { $in: req.body.products } })
    req.body.products = req.body.products.map((_id: string) => Products.find(p => p._id === _id))
    const Menu = await MenuModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    if (Menu) res.send(Menu)
    else res.status(404).send('Menu Not Found')
  } catch (err) {
    if (err instanceof Error && err.message) res.status(400).send(err.message)
    else throw err
  }
}

export const remove: Handler = async (req, res) => {
  const Menu = await MenuModel.deleteOne({ _id: req.params.id })
  if (Menu.deletedCount) res.send(Menu)
  else res.status(404).send('Menu Not found')
}

export default {
  create,
  getAll,
  getOne,
  modify,
  remove
}
