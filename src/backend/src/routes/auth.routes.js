import auth from '#src/controller/auth.controller'
import express from 'express'

const router = express.Router();

router.post('/login', auth.login);
router.post('/signup', auth.signup);
router.post('/google', auth.google);

export default router;