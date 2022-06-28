import express from 'express'
import CouponController from '../controllers/CouponController'
import paginate from '../utils/pagination'

const CouponRouter = express.Router()

// CouponRouter.post('/', restrictedToRoles('commercial'), express.json(), CouponController.create)

/**
 * @api {get} /shop/api/coupons/ Request Coupons information
 * @apiName GetAll
 * @apiGroup Coupon
 *
 * @apiSuccess {Number} count Number of products returned.
 * @apiSuccess {Array} results Array of products.
 * @apiSuccess {Object} results.user Coupon's holder.
 * @apiSuccess {String} results.coupon Coupon's activation code.
 * @apiSuccess {Date} results.date Coupon's creation date.
 * @apiSuccess {Boolean} results.isUsed If the coupon was used or not.
 * @apiSuccess {String} results._id Coupon's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "count": "1",
 *      "results": [
 *          "user": {
 *              "firstname": "Keanu",
 *              "lastname": "Reeves",
 *              "email": "keanu.reeves@theking.com",
 *              "phone": "0707070707",
 *              "role": "Client"
 *          },
 *          "coupon": "PromoCode10",
 *          "date": "Wed Jan 16 2019 05:30:00 GMT",
 *          "isUsed": False,
 *          "_id": "7F1tHGhCS"
 *      ]
 *    }
 *
 */
CouponRouter.get('/', paginate, CouponController.getAll)

/**
 * @api {get} /shop/api/coupons/:id Request Coupon information
 * @apiName GetOne
 * @apiGroup Coupon
 *
 * @apiParam {String} id Coupon's unique ID
 *
 * @apiSuccess {Object} user Coupon's holder.
 * @apiSuccess {String} coupon Coupon's activation code.
 * @apiSuccess {Date} date Coupon's creation date.
 * @apiSuccess {Boolean} isUsed If the coupon was used or not.
 * @apiSuccess {String} _id Coupon's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "user": {
 *          "firstname": "Keanu",
 *          "lastname": "Reeves",
 *          "email": "keanu.reeves@theking.com",
 *          "phone": "0707070707",
 *          "role": "Client"
 *      },
 *      "coupon": "PromoCode10",
 *      "date": "Wed Jan 16 2019 05:30:00 GMT",
 *      "isUsed": False,
 *      "_id": "7F1tHGhCS"
 *    }
 *
 */
CouponRouter.get('/:id', CouponController.getOne)

/**
 * @api {get} /shop/api/coupons/users/:id Request Coupon information from User
 * @apiName GetUserOne
 * @apiGroup Coupon
 *
 * @apiParam {String} id User's unique ID
 *
 * @apiSuccess {Object} user Coupon's holder.
 * @apiSuccess {String} coupon Coupon's activation code.
 * @apiSuccess {Date} date Coupon's creation date.
 * @apiSuccess {Boolean} isUsed If the coupon was used or not.
 * @apiSuccess {String} _id Coupon's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "user": {
 *          "firstname": "Keanu",
 *          "lastname": "Reeves",
 *          "email": "keanu.reeves@theking.com",
 *          "phone": "0707070707",
 *          "role": "Client"
 *      },
 *      "coupon": "PromoCode10",
 *      "date": "Wed Jan 16 2019 05:30:00 GMT",
 *      "isUsed": False,
 *      "_id": "7F1tHGhCS"
 *    }
 *
 */
CouponRouter.get('/user/:id', CouponController.getUserOne)

/**
 * @api {post} /shop/api/coupons/:id Use the requested Coupon
 * @apiName UseOne
 * @apiGroup Coupon
 *
 * @apiParam {String} id Coupon's unique ID
 *
 * @apiSuccess {Object} user Coupon's holder.
 * @apiSuccess {String} coupon Coupon's activation code.
 * @apiSuccess {Date} date Coupon's creation date.
 * @apiSuccess {Boolean} isUsed If the coupon was used or not.
 * @apiSuccess {String} _id Coupon's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "user": {
 *          "firstname": "Keanu",
 *          "lastname": "Reeves",
 *          "email": "keanu.reeves@theking.com",
 *          "phone": "0707070707",
 *          "role": "Client"
 *      },
 *      "coupon": "PromoCode10",
 *      "date": "Wed Jan 16 2019 05:30:00 GMT",
 *      "isUsed": False,
 *      "_id": "7F1tHGhCS"
 *    }
 *
 */
CouponRouter.post('/:id', express.json(), CouponController.use)

export default CouponRouter
