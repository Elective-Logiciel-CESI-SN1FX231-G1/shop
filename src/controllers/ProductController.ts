import { Handler } from 'express'
import ProductModel from '../models/ProductModel'

export const create: Handler = async (req, res) => {
  const Product = new ProductModel(req.body)
  try {
    await Product.save()
    res.send(Product)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const getAll: Handler = async (req, res) => {
  try {
    const Products = await ProductModel.find()
    res.send(Products)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const getOne: Handler = async (req, res) => {
  try {
    const Product = await ProductModel.findOne({ _id: req.params.id })
    res.send(Product)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const modify: Handler = async (req, res) => {
  try {
    const Product = await ProductModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.send(Product)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const remove: Handler = async (req, res) => {
  try {
    const Product = await ProductModel.deleteOne({ _id: req.params.id })
    res.send(Product)
  } catch (err) {
    res.status(400).json(err)
  }
}

export default {
  create,
  getAll,
  getOne,
  modify,
  remove
}
