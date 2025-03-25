import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // console.log(token);
    if (token == null)
      return res.status(401).json({
        status: 401,
        message: "Unauthorized, Please Login First",
      });
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
      if (err)
        return res.status(401).json({
          status: 401,
          message: err.message,
        });
      req.userId = decode.userId;
    });
    next();
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      detail: error.message,
    });
  }
};

export default verifyToken;
