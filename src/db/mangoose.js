const mongoose = require('mongoose');
const validator = require('validator')

mongoose.connect('https://app-task12.herokuapp.com/', {
    useNewUrlParser: true ,
    useCreateIndex :true ,
    // useFindAndModify : true
})
