var findAnswer = require('./mongodb_wrapper').findAnswer

const {Wit, log} = require('node-wit')

const client = new Wit({
    accessToken : process.env.WIT_AI_TOKEN_CLIENT,
    logger: new log.Logger(log.DEBUG) 
})

//console.log(client.message('afcat'))

var mineQuery = (msg)=>{
    return client.message(msg)   
}



var getEntityQuery = (msg)=>{
return new Promise((resolve,reject)=>{
mineQuery('afcat exam info').then((res)=>{
    var elems = new Object() 
    Object.keys(res.entities).forEach(element=>{
        if(element=="intent" ){
            elems[element] = '#'+res.entities[element][0].value
        }else{
            elems["entity."+element] = res.entities[element][0].value
        }
    })
    resolve(elems)
}).catch(err=>{
    reject(err)
})
})
}

//usage in actual sense
getEntityQuery('afcat exam info').then(result=>{
    return findAnswer(result)
}).then(result=>{
    console.log(result)
})


/* handling promise of answer from mongodb 
findAnswer(elems).then(result=>{
    console.log("----------------------logging this----------------------")
    console.log(result)
})
})
*/
/*
query = { "intent":"#get_info", "entity.exam":"star"},{"_id":0, "answer":1}

findAnswer(query)
*/

