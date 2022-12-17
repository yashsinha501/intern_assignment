import express from "express";
const router = express.Router();
import { authUser, registerUser, contact } from "../controllers/userController.js";



router.post('/login',authUser)
router.route('/register').post(registerUser)
router.route('/contact').post(contact)




export default router;
