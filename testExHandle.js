const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var url = 'mongodb://localhost:27017'
var database = 'nodechat'

/*
var clientPromise = (url,dbName)=>{
  return new Promise((resolve, reject)=>{
    MongoClient.connect(url,(err,client)=>{  //throw error if unable to connect to the database
        if(err) reject(err);
      else resolve(client.db(dbName));
    })
  })
}

*/

