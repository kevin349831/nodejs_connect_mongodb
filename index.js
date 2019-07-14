const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, function () {
   console.log(`server start on http://localhost:${port}, port`)
})

app.get('/get', function(req, res) {
    console.log(req.query.name);
    console.log(req.query.tel);
});

// 新增
app.get('/insert', function(req, res) {
  console.log('insert');
  //資料庫動作
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, req, function() {
      client.close();
    });
  });
});
//-------------Insert a Document
//like's http://localhost:3000/insert?name=999&id=99&level=9
const insertDocuments = function(db, req, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertOne(
    {name : req.query.name, lineid : req.query.id, level : req.query.level}
    , function(err, result) {
    assert.equal(err, null);
    console.log('insert success!');
    callback(result);
  });
}

//查詢 select Find Data
app.get('/find', function(req, res) {
  console.log('find');
  //資料庫動作
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    findDocuments(db, req, function() {
      client.close();
    });
  });
});
//-------------Find All Documents
const findDocuments = function(db, req, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find({'name' : req.query.name}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");

    console.log(docs);
    console.log(req.query.name);
    callback(docs);
  });
}



// 修改
app.get('/update', function(req, res) {
  console.log('update');
  //資料庫動作
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    updateDocument(db, req, function() {
      client.close();
    });
  });
});
//---------------Update a document
const updateDocument = function(db, req, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ 'name' : req.query.name }
    , { $set: { 'lineid' : req.query.id } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated Success!");
    callback(result);
  });
}



//資料庫連接資訊
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://root:r123456@ds147207.mlab.com:47207/php-line-liff-db';
// Database Name
const dbName = 'php-line-liff-db';
