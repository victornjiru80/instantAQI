import { Router } from "express";
import { register, login, logout, isAuth, getUser } from "../controllers/authController.js";
import userAuth from "../middlewares/userAuth.js";
const router = Router()

router.post('/register',  register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/is-auth', userAuth, isAuth);
router.get('/user', userAuth, getUser);

export default router;