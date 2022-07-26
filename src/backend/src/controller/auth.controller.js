import accountModel from "#src/models/account.model";
import jwt from "jsonwebtoken";
import config from "#src/config/config";
import {
  verifyPassword,
  encryptPassword,
  generateToken,
} from "#src/utils/crypto";
import oauth2Client from "#src/utils/oauth2";
import { getVerifyEmail, createTransport } from "#src/utils/nodemailer";
import moment from "moment";

export default {
  async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      // Check for correct email
      const account = await accountModel.getByEmail(email);
      if (account === null) {
        return res.status(200).send({
          exitcode: 101,
          message: "Email or password is not correct",
        });
      }

      // Get the database password
      const encryptedPassword = account.password;
      if (encryptedPassword === null) {
        return res.status(200).send({
          exitcode: 101,
          message: "Email or password is not correct",
        });
      }

      // Check the correctness of password
      if (!verifyPassword(password, encryptedPassword)) {
        return res.status(200).send({
          exitcode: 101,
          message: "Email or password is not correct",
        });
      }

      // Handle account not verified
      const verified = account.verified;
      if (!verified) {
        return res.status(200).send({
          exitcode: 102,
          message: "Account is not verified",
        });
      }

      const returnAccount = {
        email: account.email,
        phone: account.phone,
        fullname: account.fullname,
        avatar: account.avatar_path,
        birthday: account.birthday
          ? moment(new Date(account.birthday)).format("DD/MM/YYYY")
          : null,
        gender: account.gender,
        role: account.role,
        verified: account.verified,
      };

      // Create payload for encryption
      const payload = {
        email: email,
      };

      // Send back response with token
      res.status(200).send({
        exitcode: 0,
        message: "Login successfully",
        token: jwt.sign(payload, config.JWT_SECRET, {
          expiresIn: config.JWT_EXP_TIME,
        }),
        account: returnAccount,
      });
    } catch (err) {
      next(err);
    }
  },

  async signup(req, res, next) {
    try {
      const { email, phone, password, fullname } = req.body;

      // Check for email duplicated
      const emailAccount = await accountModel.getByEmail(email);
      if (emailAccount !== null) {
        res.status(200).send({
          exitcode: 101,
          message: "Email already exists",
        });
        return;
      }

      // Check for phone duplicated
      const phoneAccount = await accountModel.getByPhone(phone);
      if (phoneAccount !== null) {
        res.status(200).send({
          exitcode: 102,
          message: "Phone already exists",
        });
        return;
      }

      // 256 bits which provides about 1e+77 possible different number
      // This is enough for preventing brute force
      const verifyToken = generateToken(config.NUMBER_BYTE_VERIFY_TOKEN);

      // Encrypt password by salting and hashing
      const encryptedPassword = encryptPassword(password);

      // Send the time for each mail is different
      // This prevent the html being trimmed by Gmail
      const mailOption = getVerifyEmail(email, req.headers.origin, verifyToken);
      await createTransport().sendMail(mailOption);

      // Create entity to insert to DB
      const entity = {
        email: email,
        phone: phone,
        fullname: fullname,
        password: encryptedPassword,
        verified: false,
        token: verifyToken,
        role: config.role.USER,
      };
      await accountModel.signup(entity);

      res.status(200).send({
        exitcode: 0,
        message: "Create account successfully",
      });
    } catch (err) {
      next(err);
    }
  },

  async verify(req, res, next) {
    try {
      const { token } = req.body;

      const result = await accountModel.verifyAccount(token);
      if (result > 0) {
        res.status(200).send({
          exitcode: 0,
          message: "Verification successfully",
        });
      } else {
        res.status(200).send({
          exitcode: 101,
          message: "Verification code not found",
        });
      }
    } catch (err) {
      next(err);
    }
  },

  async loginGoogle(req, res, next) {
    try {
      // Extract and verify token from Google
      const { tokenId } = req.body;
      const result = await oauth2Client.verifyIdToken({
        idToken: tokenId,
        audience: config.GOOGLE_CLIENT_ID,
      });

      // Create new account if email not registered
      const { email } = result.payload;
      const currentAccount = await accountModel.getByEmail(email);
      if (currentAccount === null) {
        const newAccount = {
          email: email,
          verified: true,
        };
        await accountModel.signup(newAccount);
      }

      // Sign a new token by server
      const payload = {
        email: email,
      };
      res.send({
        exitcode: 0,
        message: "Login successfully",
        token: jwt.sign(payload, config.JWT_SECRET, {
          expiresIn: config.JWT_EXP_TIME,
        }),
      });
    } catch (err) {
      next(err);
    }
  },
};
