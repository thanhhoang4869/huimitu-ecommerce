import dotenv from 'dotenv'
dotenv.config()

const config = {
    DATABASE: {
        host: 'localhost',
        user: 'postgres',
        password: process.env.DB_PASSWORD,
        database: 'huimitu',
        port: 5432,
    },

    NO_TOKEN_URL: [
        '/auth',
        '/location',
        '/category',
        '/product'
    ],

    PORT: 8080,
    JWT_EXP_TIME: 60 * 60 * 24,
    JWT_SECRET: process.env.JWT_SECRET,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,

    GMAIL_USERNAME: process.env.GMAIL_USERNAME,
    
    BEST_SELLER_LIMIT: 8,
}

export default config