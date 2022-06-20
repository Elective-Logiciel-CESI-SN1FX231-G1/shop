import express from 'express'
import { restrictedToRoles } from '../auth'
import CouponController from '../controllers/CouponController'
import paginate from '../utils/pagination'

const CouponRouter = express.Router()

CouponRouter.post('/', restrictedToRoles('commercial'), express.json(), CouponController.create)

CouponRouter.get('/', paginate, CouponController.getAll)

CouponRouter.get('/:id', CouponController.getOne)

CouponRouter.post('/:id', express.json(), CouponController.use)

export default CouponRouter
