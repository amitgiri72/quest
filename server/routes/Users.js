import express from 'express'
import { logInController, signUpController } from '../controllers/auth.js'
import { getAllUsers, updateProfile } from '../controllers/users.js'


import auth from '../middleware/auth.js'
import { getLoginHistory } from '../controllers/loginHistory.js'
// import {userLoginMiddleware} from '../middleware/loginHistory.js'
const router = express.Router()

router.post('/signup', signUpController)


router.post('/login', logInController)
// router.post('/login', auth, userLoginMiddleware, logInController);

router.get('/getAllUsers', getAllUsers)
router.get('/history/:userId', getLoginHistory )
router.patch('/update/:id', auth, updateProfile)

export default router