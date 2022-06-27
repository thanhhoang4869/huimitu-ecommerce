import auth from '#src/controller/auth.controller'
import express from 'express'

const router = express.Router();

router.post('/login', auth.login);
router.post('/signup', auth.signup);
router.post('/loginGoogle', auth.loginGoogle);

export default router;