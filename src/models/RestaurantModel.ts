import { Schema, model } from 'mongoose'
import { User } from '../auth'

export interface IRestaurant {
  owner: User,
  name: string,
  description: string,
  address: string,
  image: string,
  phone: string,
  position:{
    lon:number,
    lat:number
  },
  openingHours:[
    {from:Date, to:Date}
  ],
  types: Array<string>,
  isClosed: boolean,
  couponDate: Date,
  _id: string
}

const RestaurantSchema = new Schema<IRestaurant>({
  owner: {
    _id: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true }
  },
  name: { type: String, required: true },
  image: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String },
  address: { type: String, required: true },
  position: {
    lon: { type: Number, required: true },
    lat: { type: Number, required: true }
  },
  openingHours: [
    {
      from: { type: Date, required: true },
      to: { type: Date, required: true }
    }
  ],
  types: [{ type: String, required: true }],
  isClosed: { type: Boolean, required: true, default: false },
  couponDate: { type: Date, required: false },
  _id: { type: String, required: true }
})

const RestaurantModel = model('Restaurant', RestaurantSchema)

export default RestaurantModel
