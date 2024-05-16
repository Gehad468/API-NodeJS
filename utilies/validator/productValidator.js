const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Category = require('../../models/categoryModel');

exports.createProductValidator = [
    check('title')
      .notEmpty()
      .withMessage('Product required').custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
      })
      ,
      check('finalPrice')
      .notEmpty()
      .withMessage('Product price is required')
      .isNumeric()
      .withMessage('Product price must be a number')
      .isLength({ max: 32 })
      .withMessage('To long price')
    
      ,
      check('priceAfterDiscount')
        .optional()
        .isNumeric()
        .withMessage('Product priceAfterDiscount must be a number')
        .custom((value, { req }) => {
          if (req.body.finalPrice <= value) {
            throw new Error('priceAfterDiscount must be lower than price');
          }
          return true;
        }),
      
       
      check('image').notEmpty().withMessage('Product image is required'),

      check('category')
      .notEmpty()
      .withMessage('Product must be belong to a category')
      .isMongoId()
      .withMessage('Invalid ID formate').custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id: ${categoryId}`)
          );
        }
      })),

      
      check('stock')
      .notEmpty()
      .withMessage('Product stock is required')
      .isNumeric()
      .withMessage('Product stock must be a number'),
      validatorMiddleware,
];

exports.getProductValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  body('title')
    .optional()
    ,
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  validatorMiddleware,
];
 