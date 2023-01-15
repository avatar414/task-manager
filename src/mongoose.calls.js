const mongoose= require('mongoose');
const validator= require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex : true, 
})

const User= mongoose.model('User',{
    name : {
        type : String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        validate(value){
            if (value.length < 7)
            {
                throw new Error('Password must be 7 or more characters');
            }
            if (value.toLowerCase().includes('password'))
            {
                throw new Error('Ummm dumbass...');
            }
        }
    },
    age : {
        type : Number,
        default : 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive integer')
            }

        }
    },
});

const Task= mongoose.model('Task',{
    description : {
        type : String,
        required : true,
        trim : true,
    },
    completed : {
        type : Boolean,
        default : false,
    },
});

// const me= new User({
//     name : '   Jimbob   ',
// //    age : 22, 
//     email : '   JIMBOB@MEAD.IO     ',
//     password : '12345lalala',
// });

// me.save().then((result) => {
//     console.log(me);
// }).catch((error) => {
//     console.log('Error: ',error)
// })

const clean= new Task({
    description : '   Bake the model   ',
//    completed : false,
});

clean.save().then(() => {
    console.log(clean);
}).catch((error) => {
    console.log('Error: ',error);
});