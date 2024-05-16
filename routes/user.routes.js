const express = require('express');
const { signin, signup, verify } = require("../user/user.controller");
const { userData } = require("../user/user.controller");
const { auther } = require("../../middleware/auth");
const { validatio } = require('../../middleware/validation');
const { signUpSchema, signinSchema } = require('./user.validation');

const userRoutes = express.Router();

userRoutes.post("/signup", validatio(signUpSchema), signup);
userRoutes.post("/signin", validatio(signinSchema), signin);
userRoutes.get("/user", auther(), userData);

userRoutes.get("/user/verify/:token", verify);

module.exports = userRoutes;
