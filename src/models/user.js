const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose= require('mongoose');
const validator= require('validator');
const jwt= require('jsonwebtoken');
const Task= require('./task');

const userSchema= new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        unique : true,
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
                throw new Error('Ummm dumbass...No');
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
    avatar : {
        type : Buffer,
    },
    tokens : [{
        token : {
            type : String,
            required : true,
        }
    }],
},{
    timestamps : true,
});

userSchema.virtual('tasks',{
    ref : 'Task',
    localField : '_id',
    foreignField : 'owner'
})

// toJSON is overriden here when called by res.send()
userSchema.methods.toJSON= function(){
    const user= this;
    const userObject= user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;

}

userSchema.methods.generateAuthToken= async function(){
    const user= this;

    const token= jwt.sign({_id : user._id.toString()},process.env.JWT_SECRET,{});
    user.tokens= user.tokens.concat({token}); //{token : token}
    await user.save();

    return token;
}

userSchema.statics.findByCredentials= async (email,password) => {
    const user= await User.findOne({email});  //{email:email}

    if(!user){
        throw new Error('Unable to login');
    }
    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('Unable to login');
    }
    return user;
}

// Hash the Plaintext Password
// This must be before User is assigned
userSchema.pre('save', async function(next){
    const user= this;

    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password, 8);

    }
 
    next();
})

// Delete User Tasks when User is Deleted
userSchema.pre('remove',async function(next){
    const user=this;
    await Task.deleteMany({owner : user._id})

    next();    
})

const User= mongoose.model('User',userSchema);
module.exports= User;