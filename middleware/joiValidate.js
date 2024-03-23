const STATUS = require("../constant/constant")
 function joiValidation(schema) {
  return async function(req, res, next) {
    try {
      const validatedData = await schema.validateAsync(req.body)
      req.body = validatedData
      next()
    } catch (error) {
      return res
        .status(400)
        .json({ status: STATUS.FAILURE, message: error.message })
    }
  }
}

module.exports = joiValidation