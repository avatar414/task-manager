const fs = require('fs');
const express= require('express');
require('./db/mongoose');

const userRouter= require('./routers/user');
const taskRouter= require('./routers/task');

const app= express();
const port= process.env.PORT || 3001

DEBUG = 1;
// (typeof DEBUG !=='undefined') ? console.log('Debug: ') : ()=>{};

// // middleware - runs between request and route handler. must be b4 app.use calls
// app.use((req,res,next) => {

//     if(req.method === 'GET'){
//         res.send('GET disabled');
//     }
//     else{
//         next();
//     }
// })

app.use((req, res, next) => {
    const maint = './maint.txt';
    //    console.log(process.cwd());
    try {
        if (fs.existsSync(maint)) {
            res.status(503).send({ error : "Site is in maintenance mode. Try again later" });
        }
        else {
            next();
        }
    }
    catch (e) {
        console.error(e)
    }
})

app.use(express.json())
app.use(userRouter);
app.use(taskRouter);

app.listen(port,() =>{
    console.log('Server is up on port ' + port);
})

// const bcrypt= require('bcryptjs');

// const myFunction= async () => {

//     const password= 'Blech123';
//     const hashedPassword= await bcrypt.hash(password, 8);

//     console.log(`Password: ${password} Hash:${hashedPassword}`);

//     const isMatch= await bcrypt.compare('Blech123',hashedPassword)
//     console.log(isMatch);
// }

// myFunction();

// const jwt= require('jsonwebtoken');
// const myFunction= async () => {

//     const token= jwt.sign({_id : 'gfhghgfgffg'},'thisismysecret', {expiresIn : '7 days'});
//     console.log(token);

//     const payload= jwt.verify(token ,'thisismysecret');
//     console.log(payload);

// }
// myFunction();


const Task= require('./models/task');
const User= require('./models/user');

// const main= async () => {
//     // //Task Owner linked to this Task
//     // const task= await Task.findById('6079fb852095d137059a1a27');
//     // await task.populate('owner').execPopulate();  //ref: property from task model
//     // console.log(task.owner);

//     // Tasks associated with User (Owner)
//     // from userSchema.virtual('tasks' in models/user.js
//     const user= await User.findById('6078ca046799de70b3d2acbd');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks)

// }
// main();

