const config = {
    server: {
        port: 8080,
        noTokenUrl: [
            '/signup',
            '/login'
        ],
        expTime: 60 * 60 * 24,
        secret: 'HUIMITU'
    },

    database: {
        host: 'localhost',
        user: 'postgres',
        password: '161026',
        database: 'huimitu',
        port: 5432,
    },

    constant: {
    }
}

export default config