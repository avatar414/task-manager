// Crud

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID= mongodb.ObjectID;
const { MongoClient, ObjectID }= require('mongodb');


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id= new ObjectID();
console.log(id);
console.log(id.getTimestamp());


MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {

    if (error) {
        return console.log('Unable to connect to database');

    }
    console.log('Connected...');

    // const db = client.db(databaseName);

    //     db.collection('users').insertOne({
    //         name : 'Bob',
    //         age : 55,
    //     },(error,result) =>{
    //         if(error){
    //             return console.log('Error: Unable to insert user');
    //         }
    //         console.log(result.ops);   
    //     })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     },
    //     {
    //         name: 'Joe',
    //         age: 34
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Insert failed');
    //     }
    //     console.log(result.ops)

    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description : 'Make Sammich',
    //         completed : false
    //     },
    //     {
    //         description : 'Finish Exercise',
    //         completed : true
    //     },
    //     {
    //         description : 'Sleep',
    //         completed : false
    //     }],(error,result) => {
    //         if(error){
    //             return console.log('Insert Failed');
    //         }
    //         console.log(result.ops)
    // });




})
