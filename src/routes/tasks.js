const express = require("express");
const router = new express.Router();
const Task = require('../models/tasks');
const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)

    }
})

router.get('/tasks/me', auth, async (req, res) => {
    try {
        // const tasks = await Task.find({ owner : req.user.id})
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        // const task = await Task.findById(_id)

        const task = await Task.findOne({ _id, owner: req.user.id })
        // console.log("96" ,task.Object)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid Updates" })
    }
    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // const task =await Task.findById(req.params.id)
        const task = await Task.findOne({ _id: req.params.id, owner: req.user.id })
        if (!task) {
            res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.delete("/tasks/:id", auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id })
        if (!task) {
            res.status(404).send("No data Found")
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})
module.exports = router