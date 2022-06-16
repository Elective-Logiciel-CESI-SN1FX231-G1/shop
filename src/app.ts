import express from 'express'
import 'express-async-errors'

import ProductRouter from './routes/ProductRouter'
import RestaurantRouter from './routes/RestaurantRouter'
import MenuRouter from './routes/MenuRouter'
import OrderRouter from './routes/OrderRouter'

const app = express()

app.use('/api/restaurants', RestaurantRouter)
app.use('/api/products', ProductRouter)
app.use('/api/menus', MenuRouter)
app.use('/api/orders', OrderRouter)

export default app
