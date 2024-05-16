const express = require("express");
const userRoutes=require("./user/user.routes");
const dotenv = require("dotenv");
const morgan = require("morgan");
 dotenv.config({ path: "config.env" });
const ApiError = require("./utilies/ErrorApi");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoutes");
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoute");
const couponRoute =require("./routes/couponRoutes");
const cartRoute =require("./routes/cartRoutes");

const globlaError = require("./middlewares/errorMiddleware");

//connect to db

dbConnection();

//express app
const app = express();

// middleware
app.use(express.json());
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`mode ${  process.env.NODE_ENV}`);
}

//mount routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/coupon",couponRoute );
app.use("/api/v1/cart",cartRoute  );

app.use(userRoutes);

app.all("*", (req, res, next) => {

    next(new ApiError(`Can't Find this Route:${req.originalUrl}`, 400));
});

app.use(globlaError);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App Running Well on port ${port}`);
});

process.on('unhandledRejection',(err)=>
{
    console.error(`UnhandkedRejection Errors: ${err.name}|${err.message}`);
   process.exit(1);
})