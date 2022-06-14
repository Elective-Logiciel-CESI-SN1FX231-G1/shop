import { Handler } from 'express'
import RestaurantModel from '../models/RestaurantModel'

export const create: Handler = async (req, res) => {
  const restaurant = new RestaurantModel(req.body)
  try {
    await restaurant.save()
    res.send(restaurant)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const getAll: Handler = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find()
    res.send(restaurants)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const getOne: Handler = async (req, res) => {
  try {
    const restaurant = await RestaurantModel.findOne({ _id: req.params.id })
    res.send(restaurant)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const modify: Handler = async (req, res) => {
  try {
    const restaurant = await RestaurantModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.send(restaurant)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const remove: Handler = async (req, res) => {
  try {
    const restaurant = await RestaurantModel.deleteOne({ _id: req.params.id })
    res.send(restaurant)
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
