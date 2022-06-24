import { Schema, model } from 'mongoose'

export interface IProduct {
  name: string,
  price: number,
  description: string,
  image: string,
  restaurant: string,
  _id: string
}

export const rawProductSchema = {
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  restaurant: { type: String, required: true },
  _id: { type: String, required: true }
}

const ProductSchema = new Schema<IProduct>(rawProductSchema).index({ name: 'text', description: 'text' })

export default model('Product', ProductSchema)
