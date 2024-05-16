const express = require('express');
const { signin, signup,userData } = require("./user.controller");
const { auther } = require("./middleware2/auth");
const { validatio } = require('./middleware2/validation');
const { signUpSchema, signinSchema } = require('./user.validation');

const userRoutes = express.Router();

userRoutes.post("/signup", validatio(signUpSchema), signup);
userRoutes.post("/signin", validatio(signinSchema), signin);
userRoutes.get("/user", auther(), userData);

module.exports = userRoutes;
