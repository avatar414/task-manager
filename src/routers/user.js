const express= require('express');
const User= require('../models/user');
const auth= require('../middleware/auth');
const router= new express.Router();


router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try{
        await user.save();
        const token= await user.generateAuthToken();
        (typeof DEBUG !=='undefined') ? console.log('Debug: Create User: ',req.body) : ()=>{};
        res.status(201).send({user , token});
    }
    catch(e){
        res.status(400).send(e);
    }
})


router.post ('/users/login',async (req,res) => {
    try {
        const user= await User.findByCredentials(req.body.email,req.body.password);
        const token= await user.generateAuthToken();
        (typeof DEBUG !=='undefined') ? console.log('Debug: Login User: ',req.body) : ()=>{};
        res.send({user , token }); //{user : user , token : token}
    }
    catch(e) {
        res.status(400).send(e);
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token

        })
        (typeof DEBUG !=='undefined') ? console.log('Debug: Logout User: ',req.body) : ()=>{};
        await req.user.save();
        res.send();
    }
    catch (e) {
        res.status(500).send();
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        (typeof DEBUG !=='undefined') ? console.log('Debug: Create User: ',req.body) : ()=>{};
        res.send();
    }
    catch (e) {
        res.status(500).send();
    }
})


// router.get('/users', auth, async (req,res) => {

//     try{
//         const users= await User.find({});
//         res.send(users);
//     }
//     catch(e){
//         res.status(500).send();
//     }
// });


router.get('/users/me', auth, async (req,res) => {
    (typeof DEBUG !=='undefined') ? console.log('Debug: Read Profile: ',req.user) : ()=>{};
    res.send(req.user);
});

// NO LONGER USED
// router.get('/users/:id',async (req,res) => {
//     const _id= req.params.id
//     try{
//         const user= await User.findById(_id);
//         if(!user){
//             return res.status(404).send();
//         }
//         res.send(user);
//     }
//     catch(e){
//         res.status(500).send(e);
//     }
// })

router.patch('/users/me', auth, async (req,res) => {
    const updates= Object.keys(req.body);
    const allowedUpdates= ['name', 'email', 'password', 'age'];
    const isValidUpdate= updates.every((update) => allowedUpdates.includes(update))

    if(!isValidUpdate){
        return res.status(400).send({error : "Invalid update field"});
    }

    try{
        updates.forEach((update) => req.user[update]= req.body[update]) // shorthand no {}
        await req.user.save()
        (typeof DEBUG !=='undefined') ? console.log(`Debug: Update User: ${req.user}`) : ()=>{};
        res.send(req.user);
    }
    catch(e){
        res.status(400).send(e);
    }
})

router.delete('/users/me', auth, async (req,res) => {
    try{
        await req.user.remove();
        (typeof DEBUG !=='undefined') ? console.log('Debug: Delete User: ',req.user) : ()=>{};
        res.send(req.user);
    }
    catch(e){
        res.status(500).send(e);
    }
})

module.exports = router;