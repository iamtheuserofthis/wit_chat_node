var findAnswer = require('./mongodb_wrapper').findAnswer

const {Wit, log} = require('node-wit')

const client = new Wit({
    accessToken : process.env.WIT_AI_TOKEN_CLIENT,
    logger: new log.Logger(log.DEBUG) 
})



var mineQuery = (msg)=>{
    return client.message(msg)   
}

var getEntityQuery = (msg)=>{
    console.log('----------------user query------------',msg)
    return new Promise((resolve,reject)=>{
    mineQuery(msg).then((res)=>{
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



module.exports = function(io,socket){

socket.on('chat',(data)=>{
    console.log(data)
    socket.emit('chat',data)
    socket.emit('typing','Assistant')
    
    getEntityQuery(data.message).then(result=>{
        console.log('------->',result)
       return findAnswer(result)
    }).then(result=>{
        var res = {
            handle:'Help Desk',
            message :result                         //packages the respose for sending it to the front-end
          } 
          socket.emit('chat',res) 
                        // emits chat event at the server side which is handled at the front end
         
        }).catch(err=>{
            console.log(err)
            
        })   
    })
}



/*
getEntityQuery('afcat exam info').then(result=>{
    return findAnswer(result)
}).then(result=>{
    console.log(result)
})
*/

