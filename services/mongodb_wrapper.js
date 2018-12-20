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


clientPromise('mongodb://localhost:27017','nodechat')
.then((db)=>{
  console.log(db)
})
.catch(err=>{ 
  console.log(err) 
})

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

var k = {
  username:'Garav',
  email:'iamtheuserofthis@gmail.com'
}

