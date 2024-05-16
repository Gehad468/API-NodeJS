const express= require('express');
const { auther } = require("../user/middleware2/auth");
const {isAdmin}=require("../user/user.controller.js")
    const {
    updateUserValidator,
    getUserValidator,
    deleteUserValidator,}=require("../utilies/validator/userValidator")
const { getUsers,
    getUser,
    updateUser,
    deleteUser,}=require('../services/userService');

const  router =express.Router();

router.route('/').get(getUsers)

router.route('/:id').get(getUserValidator,getUser)
.put(updateUserValidator,auther(),isAdmin,updateUser)
.delete(deleteUserValidator,auther(),isAdmin,deleteUser);

module.exports = router;