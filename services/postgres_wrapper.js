const {Pool, Client} = require('pg')

const pool = new Pool({
    user: process.env.PG_CHAT_USER,
    host: process.env.PG_CHAT_HOST,
    database: process.env.PG_CHAT_DATABASE,
    password:process.env.PG_CHAT_PASSWORD,
    port:process.env.PG_CHAT_PORT,
})   //will this cause a prolem by being executed after the following section

module.exports.getIntentRes = (intent_name) => {
    return pool.query('SELECT * from test_chat WHERE intent=$1',intent_name)
}