import config from '#src/config/config'
import knex from 'knex'

// For heroku deployment
const environment = process.env.NODE_ENV || "development"
const connection = (environment === "development") ? (config.DATABASE) : (process.env.DATABASE_URL);

const pg = knex({
    client: 'pg',
    connection: connection,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pg 