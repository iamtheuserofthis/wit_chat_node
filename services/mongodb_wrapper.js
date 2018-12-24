const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


var fs = require('fs')
var url = 'mongodb://localhost:27017'
var database = 'nodechat'


var clientPromise = (url,dbName)=>{
  return new Promise((resolve, reject)=>{
    MongoClient.connect(url,(err,client)=>{  //throw error if unable to connect to the database
        if(err) reject(err);
      else resolve(client.db(dbName));
    })
  })
}




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

module.exports.findAnswer = (query)=>{
 var q_answer = null
  clientPromise('mongodb://localhost:27017','nodechat')
  .then(db=>{
    const collection = db.collection('nodetest')
    collection.findOne(query, (err,result)=>{
    assert.equal(err, null)
          try{
              q_answer = result.answer
            }catch(err){
            fs.appendFile(__dirname+'/../logs/mongo_unmatched.log',"[query]:"+JSON.stringify(query)+"\n",(err)=>{
              if(err){
                console.log(err)
              }
            })
              q_answer = 'Unable to answer'
          }
          console.log(q_answer)
       })
       
      }).catch(err=>{
        console.log(err)
      })
      
}
*/

//when all catching fails before colapsing the application
process.on('uncaughtException',(err)=>{
  console.log('err caught failure:', err.message)
})
/*
query = { "intent":"#get_info", "entity.exam":"star"},{"_id":0, "answer":1}

*/

//findAnswer({"intent":"#difficulty_query","entity.form_elements":"change", "entity.registration":"True"})
/*
find place to put this
return new Promise((resolve,reject)=>{
            if(err) reject(err)
            else resolve(q_answer)
          })
*/


module.exports.findAnswer = (query)=>{
   return new Promise((resolve,reject)=>{
   clientPromise('mongodb://localhost:27017','nodechat')
   .then(db=>{    
     const collection = db.collection('nodetest')
     collection.findOne(query, (err,result)=>{
      let q_answer
     assert.equal(err, null)
           try{
               q_answer = result.answer
             }catch(err){
             fs.appendFile(__dirname+'/../logs/mongo_unmatched.log',"[query]:"+JSON.stringify(query)+"\n",(err)=>{
               if(err){
                 console.log(err)
               }
             })
               q_answer = 'Unable to answer'
           }
           resolve(q_answer)   
        })
        
     
       }).catch(err=>{
         reject(err)
       })
      })
       
 }