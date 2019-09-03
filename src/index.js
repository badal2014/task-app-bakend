const express = require("express")
require('./db/mangoose');
const Users = require('./models/users')
const Task = require('./models/tasks')
const mongoose = require('mongoose');

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


app.post("/users", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save()
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get("/users", async (req, res) => {
    try {
        const users = await Users.find({})
        res.send(users)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

app.get('/users/:id', async(req, res) => {
    try {
        const _id = req.params.id;
        
        const user = await User.find({_id : _id})
        // console.log("sdfads", User.findOne({_id : req.params.id}));
        console.log(user);
        
        // if (user.ObjectId){
        //     console.log("Not Found")
        // }
        // mongoose.Types.ObjectId.isValid(_id)
        // console.log("asfdas" , user)
        // if (!user) {
        //     return res.status(404).send()
        // }
        // res.send(user)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
    // User.findOne(_id).then((user) => {
    //     console.log(user)

    // }).catch((e) => {
    //     console.log(e)
    // })
})

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error : "Invalid Updates"})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)

    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task =  await Task.findById(_id)
        // console.log("96" ,task.Object)
        // if (!task.Object) {
        //     return res.status(404).send()
        // }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description' , 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error : "Invalid Updates"})
    }
    
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.listen(port, () => {
    console.log("Server is up on port", port)
})
