
const express = require("express");

const {updateProfile,userLogin, userRegister, viewProfile} = require("../controller/userController") 
const checkAuth = require("../middleware/checkAuth");
const joiValidation = require("../middleware/joiValidate")
const tryCatch = require("../middleware/tryCatch")


 const router = express.Router()

router.route("/registration").post( tryCatch(userRegister))
router.route("/login").post(tryCatch(userLogin))
router.route("/viewProfile").get(checkAuth, tryCatch(viewProfile))
router.route("/updateProfile").put(checkAuth, tryCatch(updateProfile))

module.exports = router;