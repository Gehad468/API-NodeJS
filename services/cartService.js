const asyncHandler=require("express-async-handler")
const slugify=require("slugify");
const Cart=require('../models/cartModel')
const ApiError = require('../utilies/ErrorApi');

exports.getCart=asyncHandler(async (req,res,next)=>
{
    const { id }=req.params;
    const cart= await Cart.findById(id);
    if(!cart)
    {
   return next(new ApiError(`No cart for this id ${id}`,404));
    }
res.status(200).json({data:cart});
})

exports.createCart = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body._id); 
    const cart = await Cart.create(req.body);
    res.status(201).json({ data: cart });
});


exports.updateCart = asyncHandler(async (req,res,next)=>
{
    const{id}=req.params;
    if(req.body.title){
        req.body.slug=slugify(req.body.title);
    }
    const cart=await Cart.findOneAndUpdate({_id:id},
       req.body,{new:true});

    if(!cart)
    {
        return next(new ApiError(`No Cart for this id ${id}`,404));

    }
res.status(200).json({data:cart});

});



