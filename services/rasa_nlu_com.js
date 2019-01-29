const http = require('http')


//making get request to the rasa nlu service
/*
http.get('http://localhost:5005/status', res=>{
    const {statusCode} = res;
    const contentType = res.headers['content-type'];

    let error

    if(statusCode !== 200){
        error = new Error('Request failed\n' + statusCode)

    }else if(! /^application\/json/.test(contentType)){
        error = new Error('Invalid content-type.\n' +
        `Unexpected type of response ${contentType}`)
    }

    if(error){
        console.error(error.message)
        res.resume()
        return;
    }
  
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data',chunk=>{ rawData += chunk })
    res.on('end',()=>{
        try{
            const parsedData = JSON.parse(rawData)
            console.log(parsedData)
        }catch(e){
            console.error(e.message)
        }
    })

}).on('error', (error)=>{
    console.error(error.message)
}) 
*/


//make post request to rasa core


//add param for unique name to maintain the session, 
var convo = function(msg, examName,idTrack){
return new Promise((resolve,reject)=>{
const postData = JSON.stringify({
'query':msg    
})
let option
const optionsAfcat = {
    hostname:'10.208.34.106',
    port:5002,                                 //change
    path:`/conversations/${idTrack}/respond`,//change it to maintain sesssions
    method:'POST',
    headers:{
        'Content-Type':'application/json',
        'Content-Length':Buffer.byteLength(postData)
    },
}

const optionsStar = {
    hostname:'10.208.34.106',
    port:5005,
    path:`/conversations/${idTrack}/respond`,
    method:'POST',
    headers:{
        'Content-Type':'application/json',
        'Content-Length':Buffer.byteLength(postData)
    },
}

if(examName=='star'){
    console.log("STAR EXAM REQUEST")
    
    option = optionsStar
    
}else if(examName=='afcat'){
    console.log("AFCAT EXAM REQUEST")
    option = optionsAfcat
}
console.log("request\n",option)

const req = http.request(option,(res)=>{
    console.log(`[RES.status] : ${res.statusCode}`)
    console.log(`[RES.headers] :${JSON.stringify(res.headers)}`)
    res.setEncoding('utf-8')

    res.on('data',(dat)=>{
        console.log(`[RES]:${dat}`)
        resolve(dat)
    })

    res.on('end',()=>{
        console.log("[RES]:end")
    })
})

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
    reject(e)
  });

req.write(postData)
req.end()
})
}


module.exports = function(io, socket){
    console.log(socket.id)
    console.log("successfully connected to rasa")
   socket.on('chat',data=>{
    console.log("exam name",data.examName)
        socket.emit('chat',data)
        socket.emit('typing','Assistant')
        convo(data.message,data.examName,`${socket.id}-${data.fullName.split(" ").join('_')}-${data.email}`).then(result=>{
            var reply = JSON.parse(result)
            var res={
                handle:"Help Desk",
                message:reply[0].text
            }
            socket.emit('chat',res)
        }).catch(err=>{
            console.error(err)
        })
    })
}