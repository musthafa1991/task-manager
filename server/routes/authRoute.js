import express from "express";
import {
  register,
  login,
  isAuthenticated,
  logout,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", authMiddleware, logout);
authRouter.get("/is-auth", authMiddleware, isAuthenticated);

export default authRouter;
