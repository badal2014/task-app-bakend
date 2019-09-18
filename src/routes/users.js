const express = require("express");
const User = require('../models/users')
const router = new express.Router()
const mongoose = require('mongoose')
const auth = require('../middleware/auth')


router.post("/users", async (req, res) => {
    console.log(User)
    const user = new User(req.body);

    try {
        await user.save()
        // const token = user.generateAuthToken()
        res.send({user})
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get("/users/me",auth , async (req, res) => {
    res.send(req.user)
    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e) {
    //     console.log(e)
    //     res.status(500).send(e)
    // }
})

router.post("/users/login" , async (req , res) => {
    try {
        const user = await User.findByCredentials(req.body.email , req.body.password)
        const token = await user.generateAuthToken()
        res.send({user , token})
    }catch(e){
        res.status(400).send()
    }
})

router.post("/users/logout" , auth , async(req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => token.token != req.token)
        await req.user.save()
        res.send("Logout Successfully")
    }catch(e) {
        res.status(500).send()
    }
})

router.post("/users/logoutall" , auth , async(req,res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send
    }
})

router.get('/users/:id',auth , (req, res) => {
    const _id = (req.params.id);
    if (mongoose.Types.ObjectId.isValid(_id)) {
        User.findById({ _id: (_id) })
            .then((user) => {
                if(!user){
                  return res.status(404).send()

                }
                res.send(user)
            })
            .catch((e) => {
                res.status(500).send(e)
            })
    } else {
        res.status(500).send("Invalid Mongo Id")
    }
})

router.patch('/users/me',auth , async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid Updates" })
    }
    try {
        // const user = await User.findById(req.params.id)
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me' ,auth, async (req , res) => {
    try{
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})
module.exports = router