/*
  IMPORT MODULE EXPRESS AND HANDLERS
*/
const express = require("express");
const { home, register, login, logout, getUserById, updateUser } = require("../controllers/users");
const { createCalculation, getLogCalculations, deleteLogCalculations } = require("../controllers/calculation");
const { getArticles, getArticleById } = require("../controllers/articles");
const { verifyToken } = require("../middleware/verifyToken");
const { refreshToken } = require("../controllers/refreshToken");

// Define Router
const router = express.Router();

// endpoint /home
router.get("/home", verifyToken, home);

// endpoint /signup
router.post("/signup", register);

// endpoint /login
router.post("/login", login);

// endpoint /profile/:id for get user by Id
router.get("/profile/:id", getUserById);

// endpoint /token
router.get("/token", refreshToken);

// endpoint /profile/:id for update user by Id
router.put("/profile/:id", updateUser);

// endpoint /calculations for create user
router.post("/calculations", createCalculation);

// endpoint /calculations for get log calculations
router.get("/calculations", getLogCalculations);

// endpoint /calculations/:id for delete log calculations
router.delete("/calculations/:id", deleteLogCalculations);

// endpoint /articles for get articles
router.get("/articles", getArticles);

// endpoint /articles/:id for get article by Id
router.get("/articles/:id", getArticleById);

// endpoint /logout
router.delete("/logout", logout);

module.exports = router;
