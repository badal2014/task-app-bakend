const express = require("express")
require('./db/mangoose');
const userRouter = require('./routes/users')
const taskRouter = require("./routes/tasks")
const app = express()
const port = process.env.PORT || 3000

const jwt = require('jsonwebtoken')

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)

app.listen(port, () => {
    console.log("Server is up on port", port)
})

// const users = require('./models/users')

// const main = async() => {
//     // const task = await tasks.findById('5d805f5334a2bd236297c656')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
//     const user = await users.findById("5d7f14e2e3e59c4867cec368")
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// main()