const express = require("express");
const router = express.Router();

const { getAllUsers, deleteUser } = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/userAuth");

router.get("/users", authMiddleware, authorizeRoles("admin"), getAllUsers);
router.delete("/users/:id", authMiddleware, authorizeRoles("admin"), deleteUser);

module.exports = router;
