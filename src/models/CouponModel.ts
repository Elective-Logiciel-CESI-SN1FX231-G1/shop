import { Schema, model } from 'mongoose'
import type { User } from '../auth'

type Coupon = 'restaurateur' | 'client' | 'deliverer'

const rawUser = {
  _id: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true }
}

interface ICoupon {
  user: User,
  coupon: Coupon,
  date: Date,
  isUsed: Boolean,
  _id: string
}

const CouponSchema = new Schema<ICoupon>({
  user: rawUser,
  coupon: { type: String, required: true },
  date: { type: Date },
  isUsed: { type: Boolean, required: true },
  _id: { type: String, required: true }
})

export default model('Coupon', CouponSchema)
