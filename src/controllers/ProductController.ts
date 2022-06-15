import { Handler } from 'express'
import ProductModel from '../models/ProductModel'

export const create: Handler = async (req, res) => {
  const Product = new ProductModel(req.body)
  try {
    await Product.save()
    res.status(201).send(Product)
  } catch (err) {
    if (err instanceof Error && err.message) res.status(400).send(err.message)
    else throw err
  }
}

export const getAll: Handler = async (req, res) => {
  const Products = await ProductModel.find()
  res.send(Products)
}

export const getOne: Handler = async (req, res) => {
  const Product = await ProductModel.findOne({ _id: req.params.id })
  if (Product) res.send(Product)
  else res.status(404).send('Product Not Found')
}

export const modify: Handler = async (req, res) => {
  try {
    const Product = await ProductModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    if (Product) res.send(Product)
    else res.status(404).send('Product Not Found')
  } catch (err) {
    if (err instanceof Error && err.message) res.status(400).send(err.message)
    else throw err
  }
}

export const remove: Handler = async (req, res) => {
  const Product = await ProductModel.deleteOne({ _id: req.params.id })
  if (Product.deletedCount) res.send(Product)
  else res.status(404).send('Product Not found')
}

export default {
  create,
  getAll,
  getOne,
  modify,
  remove
}
