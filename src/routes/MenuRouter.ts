import express from 'express'
import { restrictedToRoles } from '../auth'
import MenuController from '../controllers/MenuController'
const MenuRouter = express.Router()

MenuRouter.post('/', restrictedToRoles('restaurateur'), express.json(), MenuController.create)

MenuRouter.get('/', MenuController.getAll)

MenuRouter.get('/:id', MenuController.getOne)

MenuRouter.patch('/:id', restrictedToRoles('restaurateur'), express.json(), MenuController.modify)

MenuRouter.delete('/:id', restrictedToRoles('restaurateur'), MenuController.remove)

export default MenuRouter
