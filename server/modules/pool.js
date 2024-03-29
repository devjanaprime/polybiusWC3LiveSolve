// requires
const pg = require( 'pg' );

// set up connection
const pool = pg.Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 12,
    idleTimeoutMillis: 30000
})
// exports
module.exports = pool;