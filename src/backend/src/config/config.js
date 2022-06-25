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
        '/auth'
    ],

    CUSTOM_TOKEN_MAX_LENGTH: 500,
    PORT: 8080,
    JWT_EXP_TIME: 60 * 60 * 24,
    JWT_SECRET: process.env.JWT_SECRET,
    BEST_SELLER_LIMIT: 8,
}

export default config