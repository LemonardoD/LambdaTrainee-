#! /usr/bin/env node

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.lo4y5tt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports.addUserInfo = function(tabl, data) {
    return new Promise((resolve, reject) => {
      client.connect(err => {
        console.log("Connected to MongoDB 4 create a user");
        const collection = client.db("lambdaJSON").collection("usersjson"); 
        collection.insertOne(data, function(err, results){
          if (err) {
            reject(err);
          }
          client.close();
          resolve(results)
         
        })
      });         
    })
}

module.exports.getUserRoute = function(route) {
  return new Promise(async (resolve, reject)=>{
  await client.connect(err => {
  console.log("DB connected to get route");
  const collection = client.db("lambdaJSON").collection("usersjson"); 
  collection.find({"route": route})
  .toArray(function(err, results){
    if (err) {
      reject(err)
      }
    client.close();
    resolve(results);            
    })
    })
  })
}

