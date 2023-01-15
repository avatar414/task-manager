// Crud

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID= mongodb.ObjectID;
const { MongoClient, ObjectID }= require('mongodb');


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id= new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());


MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {

    if (error) {
        return console.log('Unable to connect to database');

    }
    console.log('Connected...');

    const db = client.db(databaseName);

    // db.collection('users').findOne({_id : new ObjectID("6063b873e5f0375a28195611")},(error,user) => {
    //     if(error){
    //         return console.log('User not found');
    //     }
    //     console.log(user);

    // })

    // db.collection('users').find({ age : 28}).toArray((error,users) => {
    //     if(error){
    //         return console.log('Cant fetch Users');
    //     }
    //     console.log(users);
    // })

    // db.collection('users').find({ age : 28}).count((error,count) => {
    //     if(error){
    //         return console.log('Cant fetch Users');
    //     }
    //     console.log(count);
    // })
    db.collection('tasks').findOne({_id : new ObjectID("60629705dc305f693b65bd79")},(error,task) => {
        if(error){
            return console.log('Cant find task');
        }
        console.log(task);

    })
    db.collection('tasks').find({ completed : false }).toArray((error,tasks) => {
        if(error){
            return console.log('Cant fetch tasks');
        }
        console.log(tasks);
    })


})
