import { Router } from "express";
import { register, login, logout, isAuth, getUser, getInviteLink } from "../controllers/authController.js";
import { getMessages, postMessage } from "../controllers/chatController.js";
import userAuth from "../middlewares/userAuth.js";
const router = Router()

router.post('/register',  register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/is-auth', userAuth, isAuth);
router.get('/user', userAuth, getUser);
router.get('/invite-link', getInviteLink);
router.get('/chat-messages', getMessages);
router.post('/chat-messages', postMessage);

export default router;