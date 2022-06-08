const config = require('../config/config')

const Pool = require('pg').Pool
const pool = new Pool(config.database)

pool.connect((err, client, release)=>{
    if (err) {
        console.error("Connect fail:", err.stack);
    }
})

module.exports = {
    pool
}