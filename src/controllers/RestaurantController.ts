import { Handler } from 'express'
import RestaurantModel from '../models/RestaurantModel'

export const create: Handler = async (req, res) => {
  const Restaurant = new RestaurantModel(req.body)
  try {
    await Restaurant.save()
    res.status(201).send(Restaurant)
  } catch (err) {
    if (err instanceof Error && err.message) res.status(400).send(err.message)
    else throw err
  }
}

export const getAll: Handler = async (req, res) => {
  const Restaurants = await RestaurantModel.find()
  res.send(Restaurants)
}

export const getOne: Handler = async (req, res) => {
  const Restaurant = await RestaurantModel.findOne({ _id: req.params.id })
  if (Restaurant) res.send(Restaurant)
  else res.status(404).send('Restaurant Not Found')
}

export const modify: Handler = async (req, res) => {
  try {
    const Restaurant = await RestaurantModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).exec()
    if (Restaurant) res.send(Restaurant)
    else res.status(404).send('Restaurant Not Found')
  } catch (err) {
    if (err instanceof Error && err.message) res.status(400).send(err.message)
    else throw err
  }
}

export const remove: Handler = async (req, res) => {
  const Restaurant = await RestaurantModel.deleteOne({ _id: req.params.id })
  Restaurant.deletedCount ? res.sendStatus(204) : res.status(404).send('Restaurant Not Found')
}

export default {
  create,
  getAll,
  getOne,
  modify,
  remove
}
