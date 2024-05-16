const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const userModel=require("../../models/userModel");

async function userExists(userId) {
  const user = await userModel.findById(userId);
  return !!user;
}
exports.createCouponValidator = [
  check("couponCode").notEmpty().isLength({ min: 3 }).withMessage("Coupon code is required"),
  check("value")
    .notEmpty()
    .withMessage("Value is required")
    .isNumeric()
    .withMessage("Value must be a number")
    .isLength({ max: 32 })
    .withMessage("Value is too long"),
  
    check('createdBy').notEmpty().isMongoId().withMessage('Invalid user ID').custom(userExists),
    validatorMiddleware,
 
  //check("createdBy").notEmpty().withMessage("createdBy is required"),
  check("updatedBy").notEmpty().withMessage("updatedBy is required"),
  check("deletedBy").notEmpty().withMessage("deletedBy is required"),
  check("expireIn")
    .notEmpty()
    .withMessage("expireIn is required")
    .isISO8601()
    .withMessage("expireIn must be a valid date in ISO8601 format"),
];

exports.getCouponValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  validatorMiddleware,
];

exports.updateCouponValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  body("title").optional(),
  validatorMiddleware,
];

exports.deleteCouponValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  validatorMiddleware,
];
