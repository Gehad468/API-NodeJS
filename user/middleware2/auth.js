const jwt= require("jsonwebtoken");
exports.auther = () => {
  return (req, res, next) => {
      if (!req.headers.authorization) {
          return res.status(401).json({ message: "Authorization header missing" });
      }

      let data = req.headers.authorization.split(" ");
      console.log("dataaa", data);

      jwt.verify(data[1], "ITIGehad", (err, decoded) => {
          if (err) return res.status(401).json({ message: "Invalid token" });
          req.userId = decoded.id;
          next();
      });
  };
};
