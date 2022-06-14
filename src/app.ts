import express from 'express'
import 'express-async-errors'

import ProductRouter from './routes/ProductRouter'
import RestaurantRouter from './routes/RestaurantRouter'

const app = express()

app.use('/api/restaurants', RestaurantRouter)
app.use('/api/products', ProductRouter)

export default app
