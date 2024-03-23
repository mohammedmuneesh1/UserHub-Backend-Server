const{ TokenExpiredError,verify} = require("jsonwebtoken")
const STATUS = require("../constant/constant")
 const checkAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]
    if (!token || typeof token !== "string") {
      return res
        .status(403)
        .json({ status: "failure", message: "token not found" })
    }
    verify(token, process.env.USER_KEY, (err, decoded) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          return res
            .status(401)
            .json({
              status: STATUS.FAILURE,
              message: "Token expired. Please log in again"
            })
        }
        return res
          .status(500)
          .json({ message: "error while verifying jwt token. login again" })
      }
      req.Id = decoded.Id
    })
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = checkAuth;
