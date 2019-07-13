const MongoClient = require('mongodb').MongoClient;     //enables to connect to mongoDB server
const assert = require('assert');       //checks boolean(true/false) values

//to startup a connection to mongoDB server 
//first designing a URL
const url = 'mongodb://localhost:27017/conFusion';      //accessing the conFusion database
//to access the client :
MongoClient.connect(url, (err, client) => {                 //db gives us access to database and then performing various operations!
    assert.equal(err, null);    //check to make sure if error is equal to null or not

    console.log('Connected correctly to database!');

    const db = client.db("conFusion");

    const collection = db.collection("dishes");
    /*
    collection.insertOne({"name":"Erfan"},
    (err, result) => {
        assert.equal(err, null);
        console.log('inserted succefully!');
    })
    */

    collection.find({}).toArray((err, result) => {
        assert.equal(err, null);
        let res = JSON.stringify(result)
        console.log('result : \n' + res);
    });

    client.close();
    console.log('disconnected from database!');
});    

