import { Schema, model } from 'mongoose'
import { User } from '../auth'

interface IRestaurant {
  owner: User,
  name: string,
  description: string,
  address: string,
  position:{
    lon:number,
    lat:number
  },
  openingHours:[
    {from:Date, to:Date}
  ],
  types: Array<string>,
  isClosed: boolean,
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
  isClosed: { type: Boolean, required: true },
  _id: { type: String, required: true }
})

export default model('Restaurant', RestaurantSchema)
