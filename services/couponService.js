const asyncHandler=require("express-async-handler")
const slugify=require("slugify");
const Coupon=require('../models/couponModel')
const ApiError = require('../utilies/ErrorApi');


exports.getCoupons=  asyncHandler( async (req,res)=>{ 
  const coupons=await Coupon.find({});
  
  res.status(200).json({results:coupons.length,data:coupons});
});

exports.getCoupon=asyncHandler(async (req,res,next)=>
{
    const { id }=req.params;
    const coupon= await Coupon.findById(id);
    if(!coupon)
    {
   return next(new ApiError(`No coupon for this id ${id}`,404));
    }
res.status(200).json({data:coupon});
})

exports.createCoupon = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.couponCode); // Generate slug from coupon code
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ data: coupon });
});


exports.updateCoupon = asyncHandler(async (req,res,next)=>
{
    const{id}=req.params;
    if(req.body.title){
        req.body.slug=slugify(req.body.title);
    }
    const coupon=await Coupon.findOneAndUpdate({_id:id},
       req.body,{new:true});

    if(!coupon)
    {
        return next(new ApiError(`No Coupon for this id ${id}`,404));

    }
res.status(200).json({data:coupon});

});

exports.deleteCoupon=asyncHandler(async(req,res,next)=>
{
    const { id}=req.params;
    const coupon=await Coupon.findByIdAndDelete(id);
    if(!coupon)
    {
        return next(new ApiError(`No Coupon for this id ${id}`,404));

    }
res.status(204).send();
})

