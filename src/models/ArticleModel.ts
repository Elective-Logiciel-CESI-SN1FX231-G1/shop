import { Schema, model } from 'mongoose'

interface IProduct {
  name: string,
  price: number,
  description: string,
  image: string,
  restaurant: string
}

const ArticleSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  restaurant: { type: String, required: true }
})

export default model('Article', ArticleSchema)
