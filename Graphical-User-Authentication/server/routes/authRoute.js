import express from 'express'
import { UserRegister, Login, tokenRefresh, getUser, pwdResetRequest, pwdReset } from '../controllers/authController.js'
const router = express.Router();

router.post('/auth/Signup', UserRegister)
router.post('/auth/login', Login)
router.post('/auth/token', tokenRefresh)
router.post('/auth/getUser', getUser)
router.post('/auth/pwdReq', pwdResetRequest)
router.post('/auth/pwdReset', pwdReset)

export default router;