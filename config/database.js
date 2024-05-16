const mongoose =require("mongoose");

const dbConnection = () => {
  //connect with database
  mongoose
    .connect("mongodb://localhost:27017/e-commerceProject")
    .then((conn) => {
      console.log(`Connect: ${  conn.connection.host}`);
    })
};


module.exports=dbConnection;