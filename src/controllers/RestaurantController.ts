import { Handler } from 'express'
import RestaurantModel from '../models/RestaurantModel'

export const create: Handler = async (req, res) => {
  const Restaurant = new RestaurantModel(req.body)
  try {
    await Restaurant.save()
    res.send(Restaurant)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const getAll: Handler = async (req, res) => {
  try {
    const Restaurants = await RestaurantModel.find()
    res.send(Restaurants)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const getOne: Handler = async (req, res) => {
  try {
    const Restaurant = await RestaurantModel.findOne({ _id: req.params.id })
    res.send(Restaurant)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const modify: Handler = async (req, res) => {
  try {
    const Restaurant = await RestaurantModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.send(Restaurant)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const remove: Handler = async (req, res) => {
  try {
    const Restaurant = await RestaurantModel.deleteOne({ _id: req.params.id })
    res.send(Restaurant)
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
