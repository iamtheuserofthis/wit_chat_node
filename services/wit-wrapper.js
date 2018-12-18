var db_connect = require('./postgres_wrapper')

const {Wit, log} = require('node-wit')

const client = new Wit({
    accessToken : process.env.WIT_AI_TOKEN_CLIENT,
    logger: new log.Logger(log.DEBUG) 
})

//console.log(client.message('afcat'))

answer_questions = (msg)=>{
    return client.message(msg)   
}

var intents = answer_questions('Hi')

console.log(intents)
