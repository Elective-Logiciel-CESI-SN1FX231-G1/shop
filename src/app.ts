import express from 'express'
import restaurantRouter from './routes/RestaurantRouter'
const app = express()

app.use('/api/restaurants', restaurantRouter)

export default app
