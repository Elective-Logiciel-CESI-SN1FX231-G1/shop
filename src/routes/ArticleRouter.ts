import express from 'express'
import articleController from '../controllers/ArticleController'
const articleRouter = express.Router()

articleRouter.post('/', express.json(), articleController.create)

articleRouter.get('/', articleController.getAll)

articleRouter.get('/:id', articleController.getOne)

articleRouter.patch('/:id', express.json(), articleController.modify)

articleRouter.delete('/:id', articleController.remove)

export default articleRouter
