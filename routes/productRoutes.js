const express= require('express');
const { auther } = require("../user/middleware2/auth");
const {isAdmin}=require("../user/user.controller.js")

const {getProductValidator,
    createProductValidator,
    updateProductValidator,
    deleteProductValidator,}=require("../utilies/validator/productValidator")
const { getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,}=require('../services/productService')

const router= express.Router();

router.route('/').get(getProducts).post(createProductValidator,createProduct);

router.route('/:id').get(getProductValidator,getProduct)
.put(updateProductValidator,auther(),isAdmin,updateProduct)
.delete(deleteProductValidator,auther(),isAdmin,deleteProduct);

module.exports = router;