const router = require("express").Router();
const authControllers = require("../controllers/authControllers");
const {checkLogin, checkNewUser} = require("../middlewares/validateRequest");

const User = require("../models/User");

router
    .post("/signup", checkNewUser, authControllers.signup)
    .post("/signin", checkLogin, authControllers.signin)
    // .get("/signout", isLoggedIn, authControllers.signout)

module.exports = router;