import dotenv from "dotenv";
dotenv.config();

const config = {
  DATABASE: {
    host: "localhost",
    user: "postgres",
    password: process.env.DB_PASSWORD,
    database: "huimitu",
    port: 5432,
  },

  NO_TOKEN_URL: ["/auth", "/location", "/category", "/product"],
  role: {
    USER: "user",
    ADMIN: "admin",
  },

  payment: {
    PAYPAL: 'paypal',
    MOMO: 'momo',
    COD: 'cod',
    NOWPAYMENT: 'nowpayment'
  },

  currency: {
    USD: 'usd',
    VND: 'vnd',
    ETH: 'eth',
  },

  orderState: {
    INIT: 'init',
    PENDING: 'pending',
    SHIPPING: 'shipping',
    CANCEL: 'cancel',
    SUCCESS: 'success',
  },

  COULDINARY_CONFIG: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },

  CLOUDINARY_PRODUCT_PATH: "huimitu/product/",
  CLOUDINARY_AVATAR_PATH: "huimitu/avatar/",

  JWT_EXP_TIME: 60 * 60 * 10,
  JWT_SECRET: process.env.JWT_SECRET,
  NUMBER_BYTE_VERIFY_TOKEN: 256 / 8,
  NUMBER_BYTE_SALT: 16 / 8,
  PORT: process.env.PORT || 8080,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
  GMAIL_USERNAME: process.env.GMAIL_USERNAME,

  MOMO_PARTNER_CODE: process.env.MOMO_PARTNER_CODE,
  MOMO_ACCESS_KEY: process.env.MOMO_ACCESS_KEY,
  MOMO_SECRET_KEY: process.env.MOMO_SECRET_KEY,

  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  PAYPAL_SECRET: process.env.PAYPAL_SECRET,

  OPENROUTESERVICE_API_KEY: process.env.OPENROUTESERVICE_API_KEY,

  BEST_SELLER_LIMIT: 4,
  PRODUCT_IMAGE_NUMBER_LIMIT: 4,
  RELATED_PRODUCT_LIMIT: 4,
  AVATAR_IMAGE_NUMBER_LIMIT: 1,

  SHOP_LAT: 10.762595373064496,
  SHOP_LONG: 106.6823047396491,
};

export default config;
