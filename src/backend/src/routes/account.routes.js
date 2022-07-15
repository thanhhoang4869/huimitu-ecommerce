import account from '#src/controller/account.controller'
import express from 'express'
import config from '#src/config/config'
import { createUploader } from '#src/utils/cloudinary'

import verifyEmailVerified from '#src/middlewares/verifyEmailVerified.mdw'
import verifyLogin from '#src/middlewares/verifyLogin.mdw'

const avatarImageUploader = createUploader(
    config.CLOUDINARY_AVATAR_PATH,
    ["png", "jpg"]
)

const router = express.Router();

router.route('/')
    .patch(account.updateInformation)
    .get(account.getInformation);

router.patch('/password', account.changePassword);

router.patch(
    '/avatar',
    verifyLogin,
    verifyEmailVerified,
    avatarImageUploader.array('avatar', config.AVATAR_IMAGE_NUMBER_LIMIT),
    account.uploadAvatar
)

export default router;