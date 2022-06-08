exports.server = {
    port: 8080,
    noTokenUrl: ['/account/login','/account/signup'],
    expTime: 60*60*24,
    secret: 'HUIMITU'
}

exports.database = {
    host: 'localhost',
    user: 'postgres',
    password: '<YOUR_PASSWORD>',
    database: 'huimitu',
    port: 5432,
}

exports.constant = {
}
