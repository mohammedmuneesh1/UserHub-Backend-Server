 function tryCatch(codeBlock) {
    return async (req, res, next) => {
      try {
        await codeBlock(req, res, next)
      } catch (error) {
        next(error)
      }
    }
  }
  
module.exports = tryCatch;