var db_connect = require('./mongodb_wrapper')

const {Wit, log} = require('node-wit')

const client = new Wit({
    accessToken : process.env.WIT_AI_TOKEN_CLIENT,
    logger: new log.Logger(log.DEBUG) 
})

//console.log(client.message('afcat'))

answer_questions = (msg)=>{
    return client.message(msg)   
}



answer_questions('Tell me about documents').then((res)=>{
    Object.keys(res.entities).forEach(element => {
        console.log(element+'-'+res.entities[element][0].value)
        
    });

    /*
    console.log()
    console.log(res.entities['intent'][0].value)
    */
})
