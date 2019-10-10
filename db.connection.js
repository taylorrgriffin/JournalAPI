const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";

function resolveError(err, responseObj) {
  if (err) responseObj.status(400).send(err);
}

function addEntry(entryObj, responseObj) {
  // connect to db instance
  MongoClient.connect(url, (err, db) => {
    resolveError(err, responseObj);
    const dbo = db.db("mydb");
    // ensure collection exists
    dbo.createCollection("entries", (err, res) => {
      resolveError(err, responseObj);
    });
    // add new entry to collection
    dbo.collection("entries").insertOne(entryObj, (err, res) => {
      resolveError(err, responseObj);
      console.info(res);
      responseObj.status(200).send({"insertedId": res.insertedId});
    });
    // close connection to db instance
    db.close();
  });
}

function getEntries(responseObj) {
  // connect to db instance
  MongoClient.connect(url, (err, db) => {
    resolveError(err, responseObj);
    var dbo = db.db("mydb");
    // sort ascending by date created
    const sort = { createDate: 1 }
    // find all entries in collection
    dbo.collection("entries").find({}).sort(sort).toArray((err, result) => {
      resolveError(err, responseObj);
      console.info(result);
      responseObj.status(200).send(result);
    });
    db.close();
  });
}

function deleteEntry(entryId, responseObj) {
  // connect to db instance
  MongoClient.connect(url, (err, db) => {
    resolveError(err, responseObj);
    var dbo = db.db("mydb");
    // specify id of entry to delete
    const q = { _id: ObjectId(entryId) };
    dbo.collection("entries").deleteOne(q, (err, obj) => {
      resolveError(err, responseObj);
      console.log(obj);
      obj.deletedCount > 0 ? responseObj.status(200).send("Deleted entry.") : resolveError(new Error("No such entry with id " + entryId), responseObj);
    });
    db.close();
  });
}

module.exports = {
  addEntry,
  getEntries,
  deleteEntry,
}