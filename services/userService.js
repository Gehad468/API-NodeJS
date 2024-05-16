const asyncHandler=require("express-async-handler")
const slugify=require("slugify");
const ApiError = require('../utilies/ErrorApi');
const User = require("../models/userModel");

exports.getUsers=  asyncHandler( async (req,res)=>{
    const page=req.query.page * 1 || 1;
    const limit=req.query.limit * 1 || 1;
    const skip=(page-1)*limit;
    
  const users=await User.find({}).skip(skip).limit(limit);
  
  res.status(200).json({results:users.length,data:users});
});

exports.getUsers=  asyncHandler( async (req,res)=>{
    const page=req.query.page * 1 || 1;
    const limit=req.query.limit * 1 || 0;
    const skip=(page-1)*limit;
    
  const users=await User.find({}).skip(skip).limit(limit);
  
  res.status(200).json({results:users.length,data:users});
});

exports.getUser=asyncHandler(async (req,res,next)=>
{
    const { id }=req.params;
    const user= await User.findById(id)//.populate({path:'category',select:'name-_id'});
    if(!user)
    {
   return next(new ApiError(`No Product for this id ${id}`,404));
    }
res.status(200).json({data:user});
})

exports.updateUser = asyncHandler(async (req,res,next)=>
{
    const{id}=req.params;
    if(req.body.name){
        req.body.slug=slugify(req.body.name);
    }
    const user=await User.findOneAndUpdate({_id:id},
       {name:req.body.name,
       email:req.body.email,
       role:req.body.role,
       isVerfied:req.body.isVerfied,
    }
       ,{new:true}
    
       );


    if(!user)
    {
        return next(new ApiError(`No Product for this id ${id}`,404));

    }
res.status(200).json({data:user});

});


// exports.changeUserPassword = asyncHandler(async (req,res,next)=>
// {
//     const{id}=req.params;
//     if(req.body.name){
//         req.body.slug=slugify(req.body.name);
//     }
//     const user=await User.findOneAndUpdate({_id:id},
//       {password:req.body.password},{new:true});

//     if(!user)
//     {
//         return next(new ApiError(`No Product for this id ${id}`,404));

//     }
// res.status(200).json({data:user});

// });

exports.deleteUser=asyncHandler(async(req,res,next)=>
{
    const { id}=req.params;
    const product=await User.findByIdAndDelete(id);
    if(!product)
    {
        return next(new ApiError(`No Product for this id ${id}`,404));

    }
res.status(204).send();
}
)

