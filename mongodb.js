// CRUD create,read,update,delete

// const mongodb = require('mongodb')

// initialise client give access to the function that we need to connect to database

// const MongoClient = mongodb.MongoClient
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = "badal"
const id = new ObjectID()
console.log(id);
console.log(id.getTimestamp());


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Unbale to connect to database")
    }
    const db = client.db(databaseName)

    // db.collection("tasks").updateMany(
    //     {
    //         completed : false
    //     },{
    //         $set : {
    //             "completed" : true
    //         }
    //     }).then((result) => {
    //         console.log(result)
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    db.collection("tasks").deleteOne({
        "description" : "auto config"
    }).then((result) => {
        console.log(result);
        
    }).catch((error) => {
        console.log(error);
    })
})
