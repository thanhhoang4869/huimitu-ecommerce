import config from '#src/config/config'
import knex from 'knex'

const pg = knex({
    client: 'pg',
    connection: config.DATABASE,
});

export default pg 