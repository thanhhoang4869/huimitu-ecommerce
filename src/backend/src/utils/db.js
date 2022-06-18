const config = require('../config/config')

const Pool = require('pg').Pool
const pool = new Pool(config.database)

pool.connect((err) => {
    if (err) {
        console.error("Connect to DB failed:", err.stack);
    } else {
        console.log("Connect to DB successfully")
    }
})

module.exports = {
    pool
}