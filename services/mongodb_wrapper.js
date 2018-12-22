const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var url = 'mongodb://localhost:27017'
var database = 'nodechat'

var clientPromise = (url,dbName)=>{
  return new Promise((resolve, reject)=>{
    MongoClient.connect(url,(err,client)=>{
      if(err) reject(err);
      else resolve(client.db(dbName));
    })
  })
}


// clientPromise('mongodb://localhost:27017','nodechat')
// .then((db)=>{
//   console.log(db)
// })
// .catch(err=>{ 
//   console.log(err) 
// })

module.exports.insertUser = (userdata, collectionName)=>{
  clientPromise('mongodb://localhost:27017','nodechat')
  .then(db=>{
      const collection = db.collection(collectionName)
      collection.insertOne({'name':userdata.username, 'email':userdata.email},(err,result)=>{
        assert.equal(err,null)
        console.log(result.result)
      })
  })
}

/*
sample query and data from the 

var udata = {
  username:'Vinay Negi',
  email:'vinaynegivins@gmail.com'
}

insertUser(udata, 'log_users') 


*/



module.exports.findAnswer = (query)=>{
 
  clientPromise('mongodb://localhost:27017','nodechat')
  .then(db=>{
      const collection = db.collection('nodetest')
      
      collection.findOne(query, (err,result)=>{
          assert.equal(err, null)
          
          try{
            console.log(result.answer)
          }catch(err){
            console.log(typeof(err))
            console.log("error caught:",err.message)
          }
          
           
          //throw new Error('Answer is emp')  //this error cannot be handled by a simple try catch as the process is completely async, being called in 
                                          //a callback
        })
      }
  )
}

//when all catching fails before colapsing the application
process.on('uncaughtException',(err)=>{
  console.log('err caught failure:', err.message)
})
/*
query = { "intent":"#get_info", "entity.exam":"star"},{"_id":0, "answer":1}

findAnswer(query)
*/





//findAnswer({"intent":"#difficulty_query","entity.form_elements":"change", "entity.registration":"True"})


