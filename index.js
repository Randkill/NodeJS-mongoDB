
const MongoClient = require('mongodb').MongoClient;     //enables to connect to mongoDB server
const assert = require('assert');       //checks boolean(true/false) values

const dbOperation = require('./operations');

//to startup a connection to mongoDB server 
//first designing a URL
const url = 'mongodb://localhost:27017/conFusion';      //accessing the conFusion database
//to access the client :
MongoClient.connect(url).then((client) => {                 //db gives us access to database and then performing various operations!

    console.log('Connected correctly to mongoDB!');

    const db = client.db("conFusion");

    console.log('Connected to conFusion database!')
 
    dbOperation.insertDocument(db, {name : "Erfan" , description : "hello"},
    'dishes')
    .then((result) => {
        console.log('Inserted document:\n', result.ops);

        return dbOperation.findDocument(db, 'dishes')
    }) 
    .then((docs) => {
        console.log('Found documents :\n', docs);

        return dbOperation.updateDocument(db, {name: "Erfan" },
        {description : "Updated test!"}, 'dishes')
    })
    .then((result) => {
        console.log('Updated Document:\n', result.result);

        return dbOperation.findDocument(db, 'dishes') 
    })
    .then((docs) => {
        console.log('Found documents :\n' , docs);

        return db.dropCollection('dishes')
    })
    .then((result) => {
        console.log('Dropped collection dishes');

        console.log('Closed connection to mongoDB!');
        return client.close();
    }).catch((err) => {
        console.log(err);
    })
}, (err) => {
    console.log(err);
}).catch((err) => {
    console.log(err);
});