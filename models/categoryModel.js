const mongoose = require("mongoose");

//1- Create Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Category Must Be Unique"],
      minlength: [3, "Too Short Category Name"],
      maxlength: [30, "Too Long Category Name"],
    },
    //geh ad ==> shoping.com/geh-ad
    slug: {
      type: String,
      lowercase: true,
   },
    image: String,
  },
  { timestamps: true },
);
//2-Create  Model
const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
