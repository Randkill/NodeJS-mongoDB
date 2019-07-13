
const MongoClient = require('mongodb').MongoClient;     //enables to connect to mongoDB server
const assert = require('assert');       //checks boolean(true/false) values

const dbOperation = require('./operations');

//to startup a connection to mongoDB server 
//first designing a URL
const url = 'mongodb://localhost:27017/conFusion';      //accessing the conFusion database
//to access the client :
MongoClient.connect(url, (err, client) => {                 //db gives us access to database and then performing various operations!
    assert.equal(err, null);    //check to make sure if error is equal to null or not

    console.log('Connected correctly to mongoDB!');

    const db = client.db("conFusion");

    console.log('Connected to conFusion database!')
 
    dbOperation.insertDocument(db, {name : "Erfan" , description : "hello"},
    'dishes', (result) => {
        console.log('Inserted document:\n', result.ops);

        dbOperation.findDocument(db, 'dishes', (docs) => {
            console.log('Found documents :\n', docs);

            dbOperation.updateDocument(db, {name: "Erfan" },
            {description : "Updated test!"}, 'dishes', (result) => {
                console.log('Updated Document:\n', result.result);

                dbOperation.findDocument(db, 'dishes', (docs) => {
                    console.log('Found documents :\n' , docs);

                    db.dropCollection('dishes', (result) => {
                        console.log('Dropped collection dishes');
                        
                        client.close();
                        console.log('Closed connection to mongoDB!');
                    });  
                });
            });
        });
    });
});    