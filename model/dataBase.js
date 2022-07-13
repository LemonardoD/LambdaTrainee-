#! /usr/bin/env node

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.lo4y5tt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports.getUser = function(email) {
  return new Promise(async (resolve, reject)=>{
    await client.connect(err => {
    console.log("Connected to MongoDB to get user");
    const collection = client.db("lambda").collection("users"); 
    collection.find({"email": email})
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

module.exports.getToken = function(token) {
  return new Promise(async(resolve, reject)=>{
    await client.connect(err => {
        console.log("Connected to MongoDB to get a token");
        const collection = client.db("lambda").collection("token"); 
        collection.find({"token": token})
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

module.exports.getRefreshToken = function(refreshToken) {
  return new Promise(async(resolve, reject)=>{
    await client.connect(err => {
        console.log("Connected to MongoDB to get a refresh token");
        const collection = client.db("lambda").collection("token"); 
        collection.find({"token": refreshToken})
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

module.exports.getUserToken = function(login) {
  return new Promise(async(resolve, reject)=>{
    await client.connect(err => {
        console.log("Connected to MongoDB 4 get token by login");
        const collection = client.db("lambda").collection("token"); 
        collection.find({"login": login})
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

module.exports.add = function(tabl, data) {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      console.log(err)
        console.log("Connected to MongoDB 4 create a user");
        const collection = client.db("lambda").collection("users"); 
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

module.exports.addToken = function(tabl, data) {
  return new Promise(async (resolve, reject) => {
    await client.connect(err => {
        console.log("Connected to MongoDB 4 create a token");
        const collection = client.db("lambda").collection("token"); 
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

module.exports.updateToken = function(tabl, data) {
  return new Promise(async (resolve, reject) => {
    await client.connect(err => {
        console.log("Connected to MongoDB 4 resave a tokens");
        const collection = client.db("lambda").collection("token"); 
        collection.updateOne({login: data.login},{$set:{token:data.token}},{$set:{token:data.refreshToken}}, function(err, results){
            if (err) {
              reject(err);
            }
            client.close();
            resolve(results)
      })
    });         
  })
}

module.exports.delete = function(email) {
    return new Promise(async(resolve, reject)=>{
        await client.connect(err => {
            console.log("Connected to MongoDB 4 delete a token when logout");
            const collection = client.db("lambda").collection("token"); 
            collection.deleteMany({ "login": email},
              function(err, results){
                if (err) {
                  reject(err);
                }
            client.close();
            resolve(results);
        })            
      });         
    })
  }
