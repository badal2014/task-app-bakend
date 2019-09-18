const mongoose = require('mongoose');
const validator = require('validator')

mongoose.connect('mongodb:mongodb+srv://taskapp:goldmetal@cluster0-eb281.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true ,
    useCreateIndex :true ,
    // useFindAndModify : true
})
