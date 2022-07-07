import account from '#src/controller/account.controller'
import express from 'express'

const router = express.Router();

router.route('/')
    .patch(account.updateInformation)
    .get(account.getInformation);

export default router;