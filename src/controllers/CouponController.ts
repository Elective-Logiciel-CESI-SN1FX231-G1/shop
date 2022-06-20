import { Handler } from 'express'
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
  const query = {}
  const [results, count] = await Promise.all([
    CouponModel.find(query).skip(req.pagination.skip).limit(req.pagination.size).exec(),
    CouponModel.countDocuments(query).exec()
  ])
  res.send({
    count,
    results
  })
}

export const getOne: Handler = async (req, res) => {
  const Coupon = await CouponModel.findOne({ _id: req.params.id })
  if (Coupon) res.send(Coupon)
  else res.status(404).send('Coupon Not Found')
}

export const use: Handler = async (req, res) => {
  const ParamCoupon = await CouponModel.findOne({ _id: req.params.id })

  if (!ParamCoupon) return res.status(404).send('User does not own a Coupon')
  if (req.user?._id !== ParamCoupon.user._id) return res.status(403).send('Coupon is not yours')
  if (ParamCoupon.isUsed) return res.status(400).send('Coupon has already been used')
  await CouponModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { date: new Date(), isUsed: true } },
    { new: true }
  )

  if (req.user?.role === 'restaurateur') {
    const todayDate: Date = new Date()
    const expirationDate = todayDate.setMonth(todayDate.getMonth() + 1)

    await RestaurantModel.findOneAndUpdate(
      { 'owner._id': req.user?._id },
      { $set: { couponDate: expirationDate } },
      { new: true })
    res.send('Restaurant has been sponsored for one month')
  }

  // Handle client bonus
}

export const processSponsor = async (sponsor: ISponsorship) => {
  await CouponModel.create({
    user: sponsor.sponsor,
    coupon: sponsor.sponsor.role,
    isUsed: false,
    _id: shortid()
  })

  await CouponModel.create({
    user: sponsor.sponsored,
    coupon: sponsor.sponsored.role,
    isUsed: false,
    _id: shortid()
  })
}

export default {
  create,
  getAll,
  getOne,
  use,
  processSponsor
}
