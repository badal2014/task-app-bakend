require('../src/db/mangoose');
const Task = require('../src/models/tasks')

// Task.findByIdAndDelete("5d6ba8260623a5057f32e3cc").then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed : false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async(id) => {
    const tast = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({'completed' : false})
    return count
}


deleteTaskAndCount('5d6ba82e0623a5057f32e3cd').then((task) => {
    console.log(task)
}).catch((e) => {
    console.log(e)
})