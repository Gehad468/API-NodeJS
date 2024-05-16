const { auther } = require("../user/middleware2/auth");
const {isAdmin}=require("../user/user.controller.js")
const express= require('express');
const {getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator,}=require("../utilies/validator/categoryValidator")
const {getCategories,getCategory,createCategory, updateCategory, deleteCategory}=require('../services/categoryService')

const router= express.Router();

router.route('/').get(getCategories).post(createCategoryValidator,createCategory);

router.route('/:id').get(getCategoryValidator,getCategory)
.put(updateCategoryValidator,auther(),isAdmin,updateCategory)
.delete(deleteCategoryValidator,auther(),isAdmin,deleteCategory);

module.exports = router;