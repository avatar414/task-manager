require('../src/db/mongoose');
const Task= require('../src/models/task')

// Task.findByIdAndDelete('6067ccca04641d59b645c39b').then((user) => {
//     console.log(user);
//     return Task.countDocuments({ completed: false }).then((result) => {
//         console.log(result);
//     })
// }).catch((e) => {
//     console.log(e)
// })
// Task.findByIdAndDelete('6067cc8604641d59b645c398').then((task) => {
//     console.log(task);
//     return Task.countDocuments({}).then((count1) => {
//         return Task.countDocuments({completed : true}).then((count2) => {
//             console.log(`You've completed ${count2} of ${count1} tasks`)
//         })
//     })
// }).catch((e) => {
//     console.log(e);
// })

const deleteTaskAndCount= async (task) => {
    await Task.findByIdAndDelete(task);
    const count= await Task.countDocuments({ completed : false });
    return(count);
}

deleteTaskAndCount('6067cce404641d59b645c39c').then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
})