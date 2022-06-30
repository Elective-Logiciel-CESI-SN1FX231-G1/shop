import { Handler } from 'express'
import RestaurantModel, { IRestaurant } from '../models/RestaurantModel'
import shortid from 'shortid'
import { User } from '../auth'
import MenuModel from '../models/MenuModel'
import ProductModel from '../models/ProductModel'
import { FilterQuery } from 'mongoose'
// import axios from 'axios'

export const create: Handler = async (req, res) => {
  req.body.owner = req.user
  const Restaurant = new RestaurantModel(req.body)
  Restaurant._id = shortid()
  Restaurant.position = { lon: 0, lat: 0 }
  // await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${req.body.address}`)
  try {
    await Restaurant.save()
    res.status(201).send(Restaurant)
  } catch (err) {
    if (err instanceof Error && err.message) res.status(400).send(err.message)
    else throw err
  }
}

export const getAll: Handler = async (req, res) => {
  const query :FilterQuery<IRestaurant> = {}
  if (req.user?.role === 'restaurateur') query['owner._id'] = req.user?._id
  const [results, count] = await Promise.all([
    RestaurantModel.find(query).skip(req.pagination.skip).limit(req.pagination.size).exec(),
    RestaurantModel.countDocuments(query).exec()
  ])
  res.send({
    count,
    results
  })
}

export const getOne: Handler = async (req, res) => {
  const Restaurant = await RestaurantModel.findOne({ _id: req.params.id })
  if (Restaurant) res.send(Restaurant)
  else res.status(404).send('Restaurant Not Found')
}

export const modify: Handler = async (req, res) => {
  const ownerRestaurant = await RestaurantModel.find({ 'owner._id': req.user?._id }, { projection: { _id: 1 } })
  if (ownerRestaurant.length === 0) return res.status(400).send('User doesn\'t own a restaurant')
  if (ownerRestaurant[0]._id !== req.params.id) return res.status(400).send('You are not the owner of this restaurant')
  req.body.owner = req.user
  try {
    const Restaurant = await RestaurantModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    if (Restaurant) res.send(Restaurant)
    else res.status(404).send('Restaurant Not Found')
  } catch (err) {
    if (err instanceof Error && err.message) res.status(400).send(err.message)
    else throw err
  }
}

export const remove: Handler = async (req, res) => {
  const ownerRestaurant = await RestaurantModel.find({ 'owner._id': req.user?._id }, { projection: { _id: 1 } })
  if (ownerRestaurant.length === 0) return res.status(400).send('User doesn\'t own a restaurant')
  if (ownerRestaurant[0]._id === req.params.id) {
    const Restaurant = await RestaurantModel.deleteOne({ _id: req.params.id })
    if (Restaurant.deletedCount) res.sendStatus(204)
    else res.status(404).send('Restaurant Not Found')
  } return res.status(400).send('You are not the owner of this restaurant')
}

export const processAccountUpdate = async (editedUser: User) => {
  if (editedUser.role === 'restaurateur') {
    await RestaurantModel.findOneAndUpdate(
      { 'owner._id': editedUser._id },
      {
        $set: {
          'owner.firstname': editedUser.firstname,
          'owner.lastName': editedUser.lastname,
          'owner.email': editedUser.email,
          'owner.phone': editedUser.phone,
          'owner.role': editedUser.role
        }
      },
      { new: true }
    )
  }
}

export const processAccountDelete = async (userId: String) => {
  const restaurantToDelete = await RestaurantModel.findOne({ 'owner._id': userId })
  if (restaurantToDelete) {
    await MenuModel.deleteMany({ restaurant: restaurantToDelete._id })
    await ProductModel.deleteMany({ restaurant: restaurantToDelete._id })
    await RestaurantModel.deleteOne({ _id: restaurantToDelete._id })
  }
}

export default {
  create,
  getAll,
  getOne,
  modify,
  remove,
  processAccountUpdate,
  processAccountDelete
}
