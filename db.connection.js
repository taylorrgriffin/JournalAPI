const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";

// TODO: test rest of endpoints
// TODO: editEntry endpoint 

function resolveError(err, responseObj) {
  if (err) responseObj.status(400).send(err);
}

function addEntry(entryObj, responseObj) {
  // connect to db instance
  MongoClient.connect(url, (err, db) => {
    if (err) {
      responseObj.status(400).send(err)
    }
    else {
      const dbo = db.db("mydb");
      // ensure collection exists
      dbo.createCollection("entries", (err, res) => {
        if (err) {
          responseObj.status(400).send(err);
          db.close();
        }
        else {
          // add datetime stamp to entry
          const now = new Date();
          entryObj.createDate = now;
          entryObj.updateDate = now;
          // add new entry to collection
          dbo.collection("entries").insertOne(entryObj, (err, res) => {
            if (err) {
              responseObj.status(400).send(err)
              db.close();
            }
            else {
              console.info(res);
              responseObj.status(200).send({"insertedId": res.insertedId});
              db.close();
            }
          });
        }
      });
    }
  });
}

function getEntries(responseObj) {
  // connect to db instance
  MongoClient.connect(url, (err, db) => {
    if (err) {
      responseObj.status(400).send(err)
    }
    else {
      var dbo = db.db("mydb");
      // ensure collection exists
      dbo.createCollection("entries", (err, res) => {
        if (err) {
          responseObj.status(400).send(err)
          db.close();
        }
        else {
          // sort ascending by date created
          const sort = { createDate: 1 }
          // find all entries in collection
          dbo.collection("entries").find({}).sort(sort).toArray((err, result) => {
            if (err) {
              responseObj.status(400).send(err)
              db.close();
            }
            else {
              console.info(result);
              responseObj.status(200).send(result);
              db.close();
            }
          });
        }
      });
    }
  });
}

function editEntry(entryObj, responseObj) {

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

function deleteAllEntries(responseObj) {
  MongoClient.connect(url, (err, db) => {
    if (err) {
      responseObj.status(400).send(err)
    }
    else {
      var dbo = db.db("mydb");
      dbo.collection("entries").remove((err, obj) => {
        if (err) {
          responseObj.status(400).send(err)
        }
        else {
          obj.deletedCount > 0 ? responseObj.status(200).send("Deleted all entries.") : resolveError(new Error("No entries were deleted."), responseObj);
        }
      });
    }
    db.close();
  });
}


module.exports = {
  addEntry,
  getEntries,
  deleteEntry,
  deleteAllEntries,
}