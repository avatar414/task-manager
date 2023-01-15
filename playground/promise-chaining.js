require('../src/db/mongoose')
const User=  require('../src/models/user')

// 6067c9e38f55a05748cbc242

// User.findByIdAndUpdate('6067c9e38f55a05748cbc242',{ age : 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age : 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
    
// })

const updateAgeAndCount= async (id,age) => {
    const user= await User.findByIdAndUpdate(id,{age}); //{age : age} ---->{age}
    const count= await User.countDocuments({age});
    return(count);
}

updateAgeAndCount('6067c9e38f55a05748cbc242',262).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
})