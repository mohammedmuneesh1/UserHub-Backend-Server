
const express = require("express");

const {updateProfile,userLogin, userRegister, viewProfile, userHome} = require("../controller/userController") 
const checkAuth = require("../middleware/checkAuth");
const joiValidation = require("../middleware/joiValidate")
const tryCatch = require("../middleware/tryCatch")
const {userRegisterValidation,userLoginValidation,userProfileUpdateValidation} =   require("../validations/joiValidation")


 const router = express.Router()

router.route("/registration").post(joiValidation(userRegisterValidation),tryCatch(userRegister))
router.route("/login").post(tryCatch(userLogin))
router.route("/viewProfile").get(checkAuth, tryCatch(viewProfile))
router.route("/updateProfile").put(checkAuth, tryCatch(updateProfile))
router.route("/home").get(checkAuth,tryCatch(userHome))

module.exports = router;