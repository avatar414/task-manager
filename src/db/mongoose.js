const mongoose= require('mongoose');

const connectionURL = process.env.MONGODB_URL;
const databaseName = 'task-manager';

mongoose.connect(`${connectionURL}/task-manager-api`,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex : true, 
})


// const Task= mongoose.model('Task',{
//     description : {
//         type : String,
//         required : true,
//         trim : true,
//     },
//     completed : {
//         type : Boolean,
//         default : false,
//     },
// });


