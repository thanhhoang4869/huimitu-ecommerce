import accountModel from '#src/models/account.model'
import { cloudinary } from '#src/utils/cloudinary'

export default {
    async getInformation(req, res, next) {
        try {
            const reqEmail = req.payload.email;
            const result = await accountModel.getByEmail(reqEmail);
            const { email, phone, fullname, birthday, gender, account_type, verified, avatar_path } = result;
            res.status(200).send({
                exitcode: 0,
                account: {
                    email: email,
                    phone: phone,
                    fullname: fullname,
                    avatar: avatar_path,
                    birthday: (birthday) ? (new Date(birthday)).toLocaleDateString() : null,
                    gender: gender,
                    accountType: account_type,
                    verified: verified
                },
                message: "Get information successfully"
            })
        } catch (err) {
            next(err)
        }
    },

    async uploadAvatar(req, res, next) {
        try {
            const { email } = req.payload;
            const { files } = req;
            const listImg = files.map(item => ({
                path: item.path,
                filename: item.filename
            }))
            const avatar = listImg[0]
            
            // Remove old image
            const currentAvatar = await accountModel.getAvatar(email);
            const currentFilename = currentAvatar.avatar_filename;
            if (currentFilename) {
                const uploader = cloudinary.uploader;
                try {
                    await uploader.destroy(currentFilename)
                } catch (err) {
                    console.log("Cannot delete old image")
                }
            }

            // Upload image
            const result = await accountModel.uploadAvatar(email, avatar);
            res.status(200).send({
                exitcode: 0,
                message: "Upload avatar successfully"
            })
        } catch (err) {
            next(err)
        }
    },

    async updateInformation(req, res, next) {
        try {
            const { phone, fullname, birthday, gender } = req.body;
            const { email } = req.payload;

            if (phone) {
                const accountPhone = await accountModel.getByPhone(phone)
                if (accountPhone && accountPhone.email !== email) {
                    return res.status(200).send({
                        exitcode: 103,
                        message: "Phone number is already used"
                    })
                }
            }

            const entity = {
                phone,
                fullname,
                birthday,
                gender
            }
            await accountModel.updateInformation(email, entity)

            res.status(200).send({
                exitcode: 0,
                message: "Update information successfully"
            })
        } catch (err) {
            next(err)
        }
    }
}