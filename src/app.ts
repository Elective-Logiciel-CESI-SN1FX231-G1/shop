import express from 'express'
import 'express-async-errors'

import ArticleRouter from './routes/ArticleRouter'
import restaurantRouter from './routes/RestaurantRouter'

const app = express()

app.use('/api/restaurants', restaurantRouter)
app.use('/api/articles', ArticleRouter)

export default app
