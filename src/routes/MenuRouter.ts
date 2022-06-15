import express from 'express'
import MenuController from '../controllers/MenuController'
const MenuRouter = express.Router()

MenuRouter.post('/', express.json(), MenuController.create)

MenuRouter.get('/', MenuController.getAll)

MenuRouter.get('/:id', MenuController.getOne)

MenuRouter.patch('/:id', express.json(), MenuController.modify)

MenuRouter.delete('/:id', MenuController.remove)

export default MenuRouter
