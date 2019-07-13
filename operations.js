//4 main operations on database
const assert = require('assert');
//INSERT
exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insert(document, (err, result) => {
        assert.equal(err, null);

        console.log('Inserted ' + result.result.n 
        + ' documents into the collection' + collection);
        callback(result);
    });
};
//FIND
exports.findDocument = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        callback(docs);
    });

};
//REMOVE or DELETE
exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.equal(err, null);
        console.log('Removed the document :\n' , document);
    });
};
//UPDATE
exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update}, null, (err, result) => {
        assert.equal(err, null);
        console.log('Updated the document with : ', update);
        callback(result);
    });
};