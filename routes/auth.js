const router = require("express").Router();
const authCtrl = require('../controllers/authController')
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const auth = require("../middlewares/auth");
// const User = require("../models/User");

router.post("/register", authCtrl.register)

router.post("/login", authCtrl.login)

// router.get("/me", auth, async (req, res) => {
//   return res.status(200).json({ ...req.user._doc });
// });

module.exports = router;