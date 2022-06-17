import express from 'express'
import { restrictedToRoles } from '../auth'
import CouponController from '../controllers/CouponController'
const CouponRouter = express.Router()

CouponRouter.post('/', restrictedToRoles('commercial'), express.json(), CouponController.create)

CouponRouter.get('/', CouponController.getAll)

CouponRouter.get('/:id', CouponController.getOne)

CouponRouter.post('/:id', express.json(), CouponController.modify)

export default CouponRouter
