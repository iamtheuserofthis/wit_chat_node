const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var url = 'mongodb://localhost:27017'
var database = 'nodechat'

var clientPromise = (url,dbname)=>{return MongoClient.connect(url,(err,client)=>{client.db(dbname)})}

/*
var insertUser = (colName, value)=>{
   
    const collection = db.collection(colName)
    collection.insertOne({'name':document},(err,result)=>{
        console.log(result)
    })
    
}

insertUser('nodechat','Gaurav')
*/
clientPromise('mongodb://localhost:27017','nodechat').then(db=>{
    const collection = db.collection('log_users')
    collection.insertOne({'name':document},(err,result)=>{
        console.log(result)
    })
})



/*
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
 
  client.close();
});

 collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
*/ 