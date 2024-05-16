const { auther } = require("../user/middleware2/auth");
const {isAdmin}=require("../user/user.controller.js")
const express = require('express');
const { getCouponValidator, createCouponValidator, updateCouponValidator, deleteCouponValidator } = require("../utilies/validator/couponValidator");

const { getCoupons,
    getCoupon,
    createCoupon,
    updateCoupon,
    deleteCoupon, } = require('../services/couponService')

const router = express.Router();

router.route('/').get(getCoupons).post(createCouponValidator, createCoupon);

router.route('/:id').get(getCouponValidator, getCoupon)
    .put(updateCouponValidator, auther(),isAdmin,updateCoupon)
    .delete(deleteCouponValidator,auther(),isAdmin, deleteCoupon);

module.exports = router;