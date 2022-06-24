import config from '#src/config/config'
import knex from 'knex'

const pg = knex({
    client: 'pg',
    connection: config.database,
});

export default pg 