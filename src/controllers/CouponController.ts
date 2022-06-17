import { Handler, response } from 'express'
import shortid from 'shortid'
import CouponModel from '../models/CouponModel'
import RestaurantModel from '../models/RestaurantModel'
import type { User } from '../auth'

interface ISponsorship {
  _id: string,
  sponsor: User,
  sponsored: User
}

export const create: Handler = async (req, res) => {
  const Coupon = await CouponModel.create(req.body)
  res.send(Coupon)
}

export const getAll: Handler = async (req, res) => {
  const Coupons = await CouponModel.find()
  res.send(Coupons)
}

export const getOne: Handler = async (req, res) => {
  const Coupon = await CouponModel.findOne({ _id: req.params.id })
  if (Coupon) res.send(Coupon)
  else res.status(404).send('Coupon Not Found')
}

export const modify: Handler = async (req, res) => {
  const ParamCoupon = await CouponModel.findOne({ _id: req.params.id })
  if (!ParamCoupon) return res.status(404).send('User doesn\'t own a Coupon')
  if (req.user?._id !== ParamCoupon.user._id) return res.status(403).send('Coupon is not yours')
  if (ParamCoupon.date) return res.status(400).send('Coupon has already been used')
  await CouponModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { date: new Date() } },
    { new: true }
  )

  if (req.user?.role === 'restaurateur') {
    const todayDate: Date = new Date()
    const expirationDate = todayDate.setMonth(todayDate.getMonth() + 1)
    const userRestaurant = await RestaurantModel.findOneAndUpdate(
      { 'owner._id': req.user?._id },
      { $set: { date: expirationDate } },
      { new: true })
    response.send(userRestaurant)
  }

  // Handle client bonus
}

export const processSponsorRestaurateur = async (sponsor: ISponsorship) => {
  await CouponModel.create({
    user: sponsor.sponsor,
    coupon: 'restaurant',
    _id: shortid()
  })

  await CouponModel.create({
    user: sponsor.sponsored,
    coupon: 'restaurant',
    _id: shortid()
  })
}

export default {
  create,
  getAll,
  getOne,
  modify,
  processSponsorRestaurateur
}
