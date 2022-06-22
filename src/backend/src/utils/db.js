import config from './../config/config.js'
import knex from 'knex'

const pg = knex({
    client: 'pg',
    connection: config.database,
});

export default pg 