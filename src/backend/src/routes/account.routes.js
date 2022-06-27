import account from '#src/controller/account.controller'
import express from 'express'

const router = express.Router();

router.get('/getInformation', account.getInformation);

export default router;