var findAnswer = require('./mongodb_wrapper').findAnswer

const {Wit, log} = require('node-wit')

const client = new Wit({
    accessToken : process.env.WIT_AI_TOKEN_CLIENT,
    logger: new log.Logger(log.DEBUG) 
})

//console.log(client.message('afcat'))

answer_questions = (msg)=>{
    return client.message(msg)   
}



/* works but creating a json object is more helpful of mongodb query format

answer_questions('Tell me about documents').then((res)=>{
    Object.keys(res.entities).forEach(element => {
        console.log(element+':'+res.entities[element][0].value)
        
    });
 })
*/

/*
answer_questions('star exam info').then((res)=>{
    var elems = new Object()
    Object.keys(res.entities).forEach(element => {
        
        console.log('element',element)
        if(element=="intent" ){
            elems[element] = '#'+res.entities[element][0].value
        }else{
            elems[element] = res.entities[element][0].value
        }
    });
    console.log(elems)
 })
*/


answer_questions('What can I carry to the exam').then((res)=>{
    var elems = new Object() 
    Object.keys(res.entities).forEach(element=>{
        if(element=="intent" ){
            elems[element] = '#'+res.entities[element][0].value
        }else{
            elems["entity."+element] = res.entities[element][0].value
        }
    })
    console.log(elems)
    findAnswer(elems)

})


/*
query = { "intent":"#get_info", "entity.exam":"star"},{"_id":0, "answer":1}

findAnswer(query)
*/

