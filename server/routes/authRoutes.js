const express = require("express");

const {
  register,
  login,
  getMe,
  checkAuth,
  logout,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", protect, getMe);

router.get("/check-auth", protect, checkAuth);

router.post("/logout", logout);

module.exports = router;