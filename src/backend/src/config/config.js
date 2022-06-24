import dotenv from 'dotenv'
dotenv.config()

const config = {
    server: {
        port: 8080,
        noTokenUrl: [
            '/signup',
            '/login'
        ],
        expTime: 60 * 60 * 24,
        secret: process.env.JWT_SECRET
    },

    database: {
        host: 'localhost',
        user: 'postgres',
        password: process.env.DB_PASSWORD,
        database: 'huimitu',
        port: 5432,
    },

    constant: {
    }
}

export default config