
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
    collection.insertOne({
        "name" : "Erfan",
        "description" : "Hello, welcome to my program!"
    },
    (err, result) => {
        assert.equal(err, null);

        console.log("After INSERT :\n" + JSON.stringify(result.ops));       //ops is number of operations done

        collection.find({}).toArray().then((docs) => {    //searching for everything in the collection
            console.log("Found :\n" + JSON.stringify(docs));    //docs is all the documents which are matched to .FIND() operation

            db.dropCollection("dishes", (err, result) => {
                assert.equal(err, null);
                //db.close();     lose the connection to the database
                client.close();
            })
        })     
    });
});    