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

var insertUser = (userdata, collectionName)=>{
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



var findAnswer = (intent_val, entities_val)=>{
  clientPromise('mongodb://localhost:27017','nodechat')
  .then(db=>{
      const collection = db.collection('nodetest')
      collection.findOne({
        "intent":intent_val,
        "entity":{
        $elemMatch:entities_val
      }}, (err,result)=>{
          console.log(result.answer)
        })
  })
}


// db.nodetest.find( { "intent":"#get_info", "entity":{ $elemMatch:{ "exam":"star"}}},{"_id":0, "answer":1})


/* this query works fine

var intent = "#get_info"
var entities = {"exam":"star"}
findAnswer(intent,entities)

*/
