import config from '#src/config/config'
import knex from 'knex'

const environment = process.env.NODE_ENV || "development"
const connection = (environment === "developement") ? (config.DATABASE) : (process.env.DATABASE_URL);

const pg = knex({
    client: 'pg',
    connection: connection,
});

export default pg 