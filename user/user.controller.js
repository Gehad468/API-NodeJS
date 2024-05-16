//const userModel = require('./');
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');
const asyncHandler=require("express-async-handler")

const sendOurEmail = require('./utilities/sendOurEmail');

const userModel = require("../models/userModel");


exports.isAdmin = asyncHandler(async (req, res, next) => {
    const userId = req.userId;
        const user = await userModel.findById(userId);
        console.log("dsfds "+user.role);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== 'admin') {

            return res.status(403).json({ message: "Only admin users are allowed to perform this action" });
        }
        next();
    
});
exports.signup = asyncHandler(async (req, res) => {
    const { name, email, password,role,address,isVerfied } = req.body;

    const foundedUser = await userModel.findOne({ email });
    if (!foundedUser) {

        const hashedPassword = bcrypt.hashSync(password, 10);
        console.log(hashedPassword);
        const addedUser = await userModel.insertMany({ name, email, password: hashedPassword,role,address,isVerfied });
        const token = jwt.sign({ id: addedUser[0]._id }, "VERIFYACCOUNT");
        sendOurEmail({ email, url: `http://localhost:3000/user/verify/${token}` });
        res.json({ message: "Done", addedUser });
    }
    else {
        res.json({ message: "You are already Registerd" });
    }
});

exports.signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const foundedUser = await userModel.findOne({ email, isVerfied: true });
    if (!foundedUser) return res.json({ message: "User Not Found Please Register First or Verify your Account" });
    const matched = bcrypt.compareSync(password, foundedUser.password);
    if (matched) {
        const token = jwt.sign({ id: foundedUser._id, name: foundedUser.name }, "ITIGehad");
        res.json({ message: "Welcome", token });
    }
    else {
        res.json({ message: "password Not Correct" });
    }
});

exports.verify = (req, res) => {
    jwt.verify(req.params.token, "VERIFYACCOUNT", async (err, decoded) => {
        console.log("sdaasd"+req.params.token);
        if (err) return res.json({ message: "Token Error" });
        const updatedUser = await userModel.findByIdAndUpdate(decoded.id, { isVerfied: true }, { new: true });
        res.json({ message: "Hello", updatedUser });
    });
};

exports.userData = asyncHandler(async (req, res) => {
    const userdata = await userModel.findById(req.userId);
    res.json({ message: "Done", userdata });
});

