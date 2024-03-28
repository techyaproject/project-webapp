const router = require("express").Router();
const authControllers = require("../controllers/authControllers");
const {checkLogin, checkNewUser} = require("../middlewares/validateRequest");


router
    .get("/all-admins", authControllers.getAllAdmins)
    .post("/signup", checkNewUser, authControllers.signup)
    .post("/signin", checkLogin, authControllers.signin)

module.exports = router;