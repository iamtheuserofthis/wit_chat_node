var db_connect = require('./postgres_wrapper')

const {Wit, log} = require('node-wit')

const client = new Wit({
    accessToken : process.env.WIT_AI_TOKEN_CLIENT,
    logger: new log.Logger(log.DEBUG) 
})

//console.log(client.message('afcat'))

answer_questions = (msg)=>{
    client.message(msg).then((Response)=>{
        console.log(Response)
    })
}

answer_questions('afcat')