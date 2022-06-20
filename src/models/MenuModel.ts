import { Schema, model } from 'mongoose'
import { rawProductSchema } from './ProductModel'
import type IProduct from './ProductModel'

export interface IMenu {
  name: string,
  price: number,
  description: string,
  image: string,
  products: Array<typeof IProduct>,
  restaurant: string,
  _id: string
}

const MenuSchema = new Schema<IMenu>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  products: [rawProductSchema],
  restaurant: { type: String, required: true },
  _id: { type: String, required: true }
})

export default model('Menu', MenuSchema)
